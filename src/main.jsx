import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from 'postcss/lib/root'
import LoginPage from './Components/Layout/LoginPages/LoginPage'
import Login from './Components/Layout/LoginPages/login/Login'
import ForgetPass from './Components/Layout/LoginPages/passForget/ForgetPass'
import ForgetPassStep2 from './Components/Layout/LoginPages/passForgetStep2/ForgetPassStep2'
import ReStep1 from './Components/Layout/LoginPages/register/step1/ReStep1'
import ReStep2 from './Components/Layout/LoginPages/register/step2/ReStep2'
import ReStep4 from './Components/Layout/LoginPages/register/step4/ReStep4'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   index: true,
      //   path: "/",
      //   element: <App />,
      //   errorElement: <Error />,
      // },
      {
        
        path: "/sign",
        element: <LoginPage />,
        errorElement: <Error />,
        children : [
          {
            path: "login",
            element: <Login />,
            errorElement: <Error />,
          },
          {
            path: "passForget",
            element: <ForgetPass />,
            errorElement: <Error />,
          },
          {
            path: "resetPass/:/:verify",
            element: <ForgetPassStep2 />,
            errorElement: <Error />,
          },
          {
            path: "rigester/step1",
            element: <ReStep1 />,
            errorElement: <Error />,
          },
          {
            path: "rigester/step2",
            element: <ReStep2 />,
            errorElement: <Error />,
          },
          {
            path: "rigester/step3",
            element: <ReStep4 />,
            errorElement: <Error />,
          }
        ]
      },
      
    ],
  },
  {
    path: "*",
    // element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
    
  </StrictMode>,
)
