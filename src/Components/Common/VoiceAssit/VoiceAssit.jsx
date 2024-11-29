import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { selectButton, selectdark } from "../../../Redux/Slice/darkMood/darkMood";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { setVoiceAction } from "../../../Redux/Slice/voicecommand/voiceSlice";
import { getRandom, promptIdeas } from "../../../Core/Services/utils/utils";

function VoiceCommand({classes}) {
  const {i18n} = useTranslation()
  const dispatch = useDispatch()

  const handleSurpriseMe = (e) => {
    const surprisePrompt = getRandom(promptIdeas);
    dispatch(setVoiceAction(surprisePrompt));
  };

  const changeLanguages = (lng) => {
      i18n.changeLanguage(lng);
  }
  const handleColorSelect = (colorIndex) => {
    dispatch(selectButton(colorIndex));
  };
  const dark = useSelector((state) => state.darkMood);
  const [theme, setTheme] = useState(dark.selectedDark);

  console.log(theme);
  const changeTheme = () => {
    dispatch(selectdark(theme));
  };
  useEffect(() => {
    changeTheme();
  }, [theme]);
 
  const [isListening, setIsListening] = useState(false);
  const annyangRef = useRef(null);
  const navigate = useNavigate();

  const loadCustomCommands = () => {
    const customNames = JSON.parse(localStorage.getItem('customNames')) || {};
    const commands = {};

    Object.keys(customNames).forEach((tag) => {
      const customName = customNames[tag];
      commands[customName] = () => {
        console.log(`Command triggered for: ${tag}`);
        navigate(`/${tag}`); 
      };
    });

    return commands;
  };

  useEffect(() => {
    const loadAnnyang = async () => {
      try {
        const { default: annyang } = await import("annyang");

        if (annyang) {
          const commands = {
            'home': () => navigate('/'),
            'open course': () => navigate('/CoursePage'),
            'open blog': () => navigate('/BlogPage'),
            'open podcast': () => navigate('/PodcastPage'),
            'change english': () => changeLanguages('en'),
            'change persian': () => changeLanguages('fa'),
            'change turkish': () => changeLanguages('tr'),
            'change to blue': () => handleColorSelect(0),
            'change to green': () => handleColorSelect(1),
            'change to yellow': () => handleColorSelect(2),
            'change to red': () => handleColorSelect(3),
            'dark mode': () => setTheme(1),
            'light mode': () => setTheme(0),

          };
          if (window.location.pathname === '/ClientPanel/DashbordEdit/Picture') {
            commands['generate image'] = handleSurpriseMe;
          }

          Object.assign(commands, loadCustomCommands());

          annyang.addCommands(commands);
          annyangRef.current = annyang;
        }
      } catch (error) {
        console.error("Failed to load annyang:", error);
      }
    };

    loadAnnyang();

    return () => {
      if (annyangRef.current) {
        annyangRef.current.abort();
        setIsListening(false);
      }
    };
  }, []);

  const toggleListening = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      if (annyangRef.current) {
        if (isListening) {
          annyangRef.current.abort();
          setIsListening(false);
        } else {
          annyangRef.current.start({ autoRestart: true, continuous: true });
          setIsListening(true);
        }
      } else {
        console.warn("Annyang is not available or not loaded properly.");
      }
    } catch (error) {
      console.error("Microphone access was denied or failed:", error);
      alert("Microphone access is required to use the voice assistant.");
    }
  };

  return (
    <div onClick={toggleListening} className={` ${classes} cursor-pointer z-30  transform -translate-x-1/2 p-4`}>
      <div className=" p-4 rounded-lg  flex items-center space-x-4">
        <div className={`relative w-12 h-12 ${isListening ? "animate-pulse" : ""}`}>
          <div className={`absolute inset-0 flex items-center justify-center 
            ${isListening ? "text-green-500" : "text-gray-500"}`}>
            {isListening ? <FaMicrophone size={25} /> : <FaMicrophoneSlash size={25} />}
          </div>
          {isListening && (
            <div className="absolute top-0 left-0 right-0 bottom-0 animate-ping bg-green-500 opacity-50 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceCommand;
