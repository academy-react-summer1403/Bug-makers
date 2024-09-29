import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App'
import './index.css'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
