import React, { useEffect, useState, useRef } from "react";

function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const annyangRef = useRef(null);

  useEffect(() => {
    // بارگذاری annyang به صورت دینامیک
    const loadAnnyang = async () => {
      try {
        const { default: annyang } = await import("annyang");

        if (annyang) {
          const commands = {
            hello: () => alert("Hello! How can I assist you?"),
            "open google": () =>
              window.open("https://www.google.com", "_blank"),
            "change background": () =>
              (document.body.style.backgroundColor = "lightblue"),
            "say goodbye": () => alert("Goodbye! Have a great day!"),
          };

          annyang.addCommands(commands);

          // ذخیره annyang در annyangRef
          annyangRef.current = annyang;
        }
      } catch (error) {
        console.error("Failed to load annyang:", error);
      }
    };

    loadAnnyang();

    // توقف annyang هنگام از بین رفتن کامپوننت
    return () => {
      if (annyangRef.current) {
        annyangRef.current.abort();
        setIsListening(false);
      }
    };
  }, []);

  // تابع برای درخواست دسترسی به میکروفون و فعال/غیرفعال کردن گوش دادن
  const toggleListening = async () => {
    try {
      // درخواست دسترسی به میکروفون
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // اگر annyang بارگذاری شده باشد، شروع یا توقف گوش دادن
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
    <div className="absolute z-30 top-0 left-[40%]">
      <h2>Voice Assistant</h2>
      <p>Status: {isListening ? "Listening..." : "Not listening"}</p>
      <button onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>
        Try saying: "hello", "open google", "change background", or "say
        goodbye"
      </p>
    </div>
  );
}

export default VoiceCommand;


// import React, { useState } from "react";
// import annyang from "annyang";

// import { useNavigate } from "react-router-dom";

// const VoiceCommand = () => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState(
//     "Press the button to start voice recognition"
//   );
//   const [isListening, setIsListening] = useState(false);

//   const startListening = () => {
//     if (annyang) {
//       const commands = {
//         hello: () => setMessage("Hello! How can I assist you?"),
//         "change color to :color": (color) => {
//           setMessage(`Changing color to ${color}`);
//           document.body.style.backgroundColor = color;
//         },
//         "go to course page": () => {
//           setMessage("go to course page");
//           navigate("/course");
//         },
//         reset: () => {
//           setMessage("Resetting color");
//           document.body.style.backgroundColor = "white";
//         },
//       };

//       annyang.addCommands(commands);

//       annyang.start();
//       setIsListening(true);
//     } else {
//       setMessage("Voice recognition is not supported in this browser.");
//     }
//   };

//   const stopListening = () => {
//     if (annyang) {
//       annyang.abort();
//       setIsListening(false);
//       setMessage("Voice recognition stopped");
//     }
//   };

//   const handleButtonClick = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", paddingTop: "50px" }}>
//       <h1>{message}</h1>
//       <button onClick={handleButtonClick}>
//         {isListening ? "Stop Listening" : "Start Listening"}
//       </button>
//       <p>Try saying "hello", "change color to blue", or "reset".</p>
//       <button onClick={() => navigate("/course")}>navigate</button>
//     </div>
//   );
// };

// export default VoiceCommand;