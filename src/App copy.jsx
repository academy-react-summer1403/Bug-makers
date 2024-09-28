import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className='from-neutral-600 bg-slate-500 font-bold'>hi</h2>
      <div className='w-44 border-l-orange-500'></div>
    </>
  )
}

export default App
