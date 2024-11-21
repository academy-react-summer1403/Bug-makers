import React, { Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "../App/App";
import { Root } from "postcss";
import LandingPage from "../Pages/Landing Page/LandingPage";
import CoursePage from "../Pages/CoursePage/CoursePage";
import ContactUs from "../Pages/ContactWe/ContactWe";
import BlogPage from "../Components/Layout/BlogPage/BlogPage";
import BlogDetail from "../Components/Layout/BlogDetail/BlogDetail";
import PodcastPage from "../Components/Layout/PodcastPage/PodcastPage";
import PodcastDetail from "../Components/Layout/PodcastDetail/PodcastDetail";
import CourseDetail from "../Components/Layout/CourseDetail/CourseDetail";
import NotFoundPage from "../Pages/NotFound/NotFoundPage";
import ClientPanel from "../Components/Layout/ClientPanel/ClientPanel";
import Dashbord from "../Components/Layout/ClientPanel/LeftSide/Dashbord/Dashbord";
import MyCourses from "../Components/Layout/ClientPanel/LeftSide/MyCoursess/MyCourses";
import MyReserve from "../Components/Layout/ClientPanel/LeftSide/MyReserve/MyReserve";
import LikedCourse from "../Components/Layout/ClientPanel/LeftSide/LikedCourse/LikedCourse";
import LikedBlog from "../Components/Layout/ClientPanel/LeftSide/LikedBlog/LikedBlog";
import Tornoment from "../Components/Layout/ClientPanel/LeftSide/Tornoment/Tornoment";
import Payment from "../Components/Layout/ClientPanel/LeftSide/Payment/Payment";
import PaymentFirstStep from "../Components/Layout/ClientPanel/LeftSide/Payment/paymwntTabs/firstTab";
import PaymentSecoundTab from "../Components/Layout/ClientPanel/LeftSide/Payment/paymwntTabs/secoundTab";
import FacturePeyment from "../Components/Layout/ClientPanel/LeftSide/Payment/paymwntTabs/FacturePeyment";
import DashbordEdit from "../Components/Layout/ClientPanel/LeftBar/DashbordEdit";
import PersonalInfo from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/PersonalInfo/PersonalInfo";
import ProfilePic from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/ProfilePic/ProfilePic";
import Address from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/Address/Address";
import Links from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/Links/Links";
import PassWord from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/PassWord/PassWord";
import Security from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/Security/Security";
import LoginPage from "../Components/Layout/LoginPages/LoginPage";
import Login from "../Components/Layout/LoginPages/login/Login";
import TwoStepLogin from "../Components/Layout/LoginPages/twoStep/twoStep";
import ForgetPass from "../Components/Layout/LoginPages/passForget/ForgetPass";
import { ForgetPassStep2 } from "../Core/Services/Api/auth";
import ReStep1 from "../Components/Layout/LoginPages/register/step1/ReStep1";
import ReStep2 from "../Components/Layout/LoginPages/register/step2/ReStep2";
import ReStep4 from "../Components/Layout/LoginPages/register/step4/ReStep4";
import AcceptGmail from "../Components/Layout/ClientPanel/LeftBar/LeftBarDown/Security/AcceptGmail";
import { Toaster } from "react-hot-toast";
import { TourProvider } from "../Components/Common/Tuor/TourContext";
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/CoursePage",
        element: <CoursePage />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
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
        path: "/PodcastPage",
        element: <PodcastPage />,
        errorElement: <Error />,
      },
      {
        path: "PodcastDetail/:id",
        element: <PodcastDetail />,
        errorElement: <Error />,
      },
      {
        path: "CourseDetail/:id",
        element: <CourseDetail />,
        errorElement: <Error />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
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
        path: "Tornoment",
        element: <Tornoment />,
        errorElement: <Error />,
      },
      {
        path: "Payment",

        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Payment />,
            errorElement: <Error />,
          },
          {
            path: "PaymentFirstStep",
            element: <PaymentFirstStep />,
            errorElement: <Error />,
          },
          {
            path: "PaymentSecoundTab/:id",
            element: <PaymentSecoundTab />,
            errorElement: <Error />,
          },
          {
            path: "FacturePeyment/:payId/:id/:status",
            element: <FacturePeyment />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "DashbordEdit",
        element: <DashbordEdit />,
        errorElement: <Error />,
        children: [
          {
            index: true,
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
          {
            path: "PassWord",
            element: <PassWord />,
            errorElement: <Error />,
          },
          {
            path: "Security",
            element: <Security />,
            errorElement: <Error />,
          },
        ],
      },
    ],
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
        path: "login/twoStep",
        element: <TwoStepLogin />,
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
    path: "/acceptGmail/:first/:secound/:third",
    element: <AcceptGmail />,
    errorElement: <Error />,
  },
]);

const Rooter = () => {
  return (
    <RouterProvider router={router}>
      <Suspense fallback={<>loading</>}>
        <NextUIProvider>
          
            <Outlet />
            
         
        </NextUIProvider>
      </Suspense>
    </RouterProvider>
  );
};
export default Rooter;
