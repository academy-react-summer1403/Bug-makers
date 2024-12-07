import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneAltSlash } from 'react-icons/fa'; // وارد کردن آیکون‌ها
import { useDispatch } from 'react-redux';
import { setVoiceType } from '../../../Redux/Slice/SpechToText/spechToText';
import toast from 'react-hot-toast';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
    const dispatch = useDispatch()
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("دسترسی به میکروفن موفقیت‌آمیز بود.");
      } catch (err) {
        toast.error("دسترسی به میکروفن رد شد. لطفاً دسترسی را فعال کنید.");
      }
    };

    checkMicrophonePermission();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech Recognition API در مرورگر شما پشتیبانی نمی‌شود.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.lang = 'fa-IR';
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const latestTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(latestTranscript);
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('خطا در شناسایی گفتار', event.error);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      if (isListening) {
        recognition.stop(); // توقف شناسایی
      } else {
        recognition.start(); // شروع شناسایی
      }
    }
    setIsListening(!isListening); // تغییر وضعیت
  };

  useEffect(() => {
    dispatch(setVoiceType(transcript))
  }, [transcript])

  return (
      <div className="flex  items-center">
        <button
          className={`p-2 rounded-full transition duration-300 ease-in-out ${isListening ? 'bg-green-500 shadow-lg' : 'bg-gray-300'}`}
          onClick={toggleListening}
        >
          {isListening ? (
            <FaMicrophone className="text-white text-3xl" />
          ) : (
            <FaMicrophoneAltSlash className="text-gray-700 text-3xl" />
          )}
        </button>
    </div>
  );
};

export default SpeechToText;
