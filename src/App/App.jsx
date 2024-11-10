import { Suspense, useEffect, useRef, useState } from 'react'
import './App.css'
import Header from '../Components/Layout/Header/Header'
import LoginPage from '../Components/Layout/LoginPages/LoginPage.jsx'
import { Outlet } from 'react-router-dom'
import Login from '../Components/Layout/LoginPages/login/Login.jsx'
import BlogPage from '../Components/Layout/BlogPage/BlogPage.jsx'
import BlogDetail from '../Components/Layout/BlogDetail/BlogDetail.jsx'
import CourseDetail from '../Components/Layout/CourseDetail/CourseDetail.jsx'
import { Toaster } from 'react-hot-toast'
import { NextUIProvider } from '@nextui-org/react'
import ThemeColor from '../Components/Common/ThemeColor/ThemeColor.jsx'
import ScrollTopButton from '../Components/Common/ScrollTopButton/ScrollTopButton.jsx'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Root } from 'postcss'



function App() {

  const {i18n} = useTranslation()
  const ref = useRef();

  useEffect(() => {
    ref.current.dir = i18n.dir()
  }, [i18n, i18n.language])

const dark = useSelector((state) => state.darkMood);
  return (
    <div
      ref={ref}
      dir="rtl"
      style={{ background: dark.bgLow, color: dark.textHigh }}
    >
      <Toaster />
      <Outlet />
    </div>
  );
}

export default App
