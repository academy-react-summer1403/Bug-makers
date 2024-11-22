import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "../Components/Layout/Header/Header";
import { Outlet } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import ScrollTopButton from "../Components/Common/ScrollTopButton/ScrollTopButton.jsx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AppTour from "../Components/Common/Tuor/Tour.jsx";
import Help from "../Components/Common/Help/Help.jsx";
import { TourProvider } from "../Components/Common/Tuor/TourContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  const ref = useRef();

  useEffect(() => {
    ref.current.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      ref={ref}
      dir="rtl"
      style={{ background: dark.bgLow, color: dark.textHigh }}
    >
      
      
          <TourProvider>
            <AppTour />
            <Header />
            <Outlet />
            <Help />

            <ScrollTopButton />
          </TourProvider>

    </div>
  );
}

export default App;
