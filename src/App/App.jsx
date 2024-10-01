import { useState } from 'react'
import './App.css'
import Header from '../Components/Layout/Header/Header'
import LandingPage from '../Pages/Landing Page/LandingPage'
import { Outlet } from 'react-router-dom'
import ThemeColor from '../Components/Common/ThemeColor/ThemeColor'
import ScrollTopButton from '../Components/Common/ScrollTopButton/ScrollTopButton'

function App() {

  return (
    <div dir='rtl'>
      <Header />
      <Outlet />
      <ThemeColor />
      <ScrollTopButton />
    </div>
  )
}

export default App
