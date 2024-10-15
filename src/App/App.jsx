import { useState } from 'react'
import './App.css'
import Header from '../Components/Layout/Header/Header'
import LoginPage from '../Components/Layout/LoginPages/LoginPage.jsx'
import { Outlet } from 'react-router-dom'
import Login from '../Components/Layout/LoginPages/login/Login.jsx'
import BlogPage from '../Components/Layout/BlogPage/BlogPage.jsx'
import BlogDetail from '../Components/Layout/BlogDetail/BlogDetail.jsx'
import CourseDetail from '../Components/Layout/CourseDetail/CourseDetail.jsx'

function App() {

  return (
    <>
      {/* <BlogDetail/> */}
      <Outlet/>
      {/* <CourseDetail/> */}
      
    </>
  )
}

export default App
