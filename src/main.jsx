import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/App/App.jsx'
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
import { Provider } from 'react-redux'
import { Store } from '../src/Redux/Store/Store';
import { QueryClient, QueryClientProvider } from 'react-query';
import BlogDetail from './Components/Layout/BlogDetail/BlogDetail.jsx'
import BlogPage from './Components/Layout/BlogPage/BlogPage.jsx'
import CourseDetail from './Components/Layout/CourseDetail/CourseDetail.jsx'
import ClientPanel from './Components/Layout/ClientPanel/ClientPanel.jsx'
import PersonalInfo from './Components/Layout/ClientPanel/LeftBar/LeftBarDown/PersonalInfo/PersonalInfo.jsx'
import ProfilePic from './Components/Layout/ClientPanel/LeftBar/LeftBarDown/ProfilePic/ProfilePic.jsx'
import Address from './Components/Layout/ClientPanel/LeftBar/LeftBarDown/Address/Address.jsx'
import Links from './Components/Layout/ClientPanel/LeftBar/LeftBarDown/Links/Links.jsx'
import DashbordEdit from './Components/Layout/ClientPanel/LeftBar/DashbordEdit.jsx'
import Dashbord from './Components/Layout/ClientPanel/LeftSide/Dashbord/Dashbord.jsx'
import LikedCourse from './Components/Layout/ClientPanel/LeftSide/LikedCourse/LikedCourse.jsx'
import LikedBlog from './Components/Layout/ClientPanel/LeftSide/LikedBlog/LikedBlog.jsx'
import MyReserve from './Components/Layout/ClientPanel/LeftSide/MyReserve/MyReserve.jsx'
import MyCourses from './Components/Layout/ClientPanel/LeftSide/MyCoursess/MyCourses.jsx'
import CoursePage from './Pages/CoursePage/CoursePage.jsx'
// import LandingPage from './Pages/Landing Page/LandingPage.jsx'
import NotFoundPage from './Pages/NotFound/NotFoundPage.jsx'
import YourComponent from './Pages/LandingPage/LL.jsx'

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <YourComponent />,
      },
      {
        path: "/CoursePage",
        element: <CoursePage />,
      },
      {
        path: "/ClientPanel",
        element: <ClientPanel />,
        errorElement: <Error />,
        children: [
          {
            path: "Dashbord",
            element: <Dashbord />,
            errorElement: <Error />,
          },
          {
            path: "MyCourse",
            element: <MyCourses />,
            errorElement: <Error />,
          },
          {
            path: "MyReserve",
            element: <MyReserve />,
            errorElement: <Error />,
          },
          {
            path: "LikedCourse",
            element: <LikedCourse />,
            errorElement: <Error />,
          },
          {
            path: "LikedBlog",
            element: <LikedBlog />,
            errorElement: <Error />,
          },
          {
            path: "DashbordEdit",
            element: <DashbordEdit />,
            errorElement: <Error />,
            children: [
              {
                path: "Personal",
                element: <PersonalInfo />,
                errorElement: <Error />,
              },
              {
                path: "Picture",
                element: <ProfilePic />,
                errorElement: <Error />,
              },
              {
                path: "Address",
                element: <Address />,
                errorElement: <Error />,
              },
              {
                path: "Links",
                element: <Links />,
                errorElement: <Error />,
              },
              
            ],
          },
        ],
      },
      {
        path: "/BlogPage",
        element: <BlogPage />,
        errorElement: <Error />,
      },
      {
        path: "BlogDetail/:id",
        element: <BlogDetail />,
        errorElement: <Error />,
      },
      {
        path: "CourseDetail/:id",
        element: <CourseDetail />,
        errorElement: <Error />,
      },
      {
        path: "/sign",
        element: <LoginPage />,
        errorElement: <Error />,
        children: [
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
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
    </QueryClientProvider>
    </Provider>
    
  </StrictMode>,
)
