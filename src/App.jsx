import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className='bg-red-500'>hi</h2>
      <div className='h-28 w-52 bg-blue-600'></div>
      <div className='h-28 w-52 bg-yellow-400'></div>
    </>
  )
}

export default App
