import React, { useEffect, useState, useRef } from "react";

function VoiceAssistant() {
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
        
      } 
      else {
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

export default VoiceAssistant;
