import { useState } from 'react'
import './App.css'
<<<<<<< HEAD
import LoginPage from '../Components/Layout/LoginPage/loginPage'
=======
import Header from '../Components/Layout/Header/Header'
import LoginPage from '../Components/Layout/LoginPages/LoginPage.jsx'
import { Outlet } from 'react-router-dom'
import Login from '../Components/Layout/LoginPages/login/Login.jsx'
>>>>>>> Login

function App() {

  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
      <h2 className='bg-red-500'>hi</h2>
<<<<<<< HEAD:src/App.jsx
      <br />
      <div className='bg-blue-600 w-56 h-48'>test git</div>
=======
      <div className='h-28 w-52 bg-blue-600'></div>
      <div className='h-28 w-52 bg-yellow-400'></div>
>>>>>>> 7e431a9e69114b246d10970fefed5b333062d781:src/App/App.jsx
=======
      <LoginPage/>
>>>>>>> d2b31e5917492e95712fc0331dfef3dbc9946c34
=======
      

      <Outlet/>
>>>>>>> Login
    </>
  )
}

export default App
