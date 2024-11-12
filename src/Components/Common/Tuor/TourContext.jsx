// TourContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { getItem } from "../../../Core/Services/common/storage.services";

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isTourOpen2, setIsTourOpen2] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const newUse = getItem("newUser");
  useEffect(()=>{
    newUse == 1 || isTourOpen2 == false ? setIsTourOpen(false) : setIsTourOpen(true)
  },[])

  const handleTourClose = () => {setIsTourOpen(false) ;setIsTourOpen2(false) };
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <TourContext.Provider
      value={{ isTourOpen, currentStep, handleTourClose, goToNextStep }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
