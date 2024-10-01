import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App'
import './index.css'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store/Store'
import LandingPage from './Pages/Landing Page/LandingPage'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        index: true,
        element: <LandingPage />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
