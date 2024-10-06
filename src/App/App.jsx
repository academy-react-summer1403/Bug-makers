import { useState } from 'react'
import './App.css'
import Header from '../Components/Layout/Header/Header'
import LandingPage from '../Pages/Landing Page/LandingPage'
import { Outlet } from 'react-router-dom'
import ThemeColor from '../Components/Common/ThemeColor/ThemeColor'
import ScrollTopButton from '../Components/Common/ScrollTopButton/ScrollTopButton'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div dir='rtl'>
      <Header />
      <Outlet />
      <Toaster />
      <ThemeColor />
      <ScrollTopButton />
    </div>
  )
}

export default App
