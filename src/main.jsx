import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store/Store';
import { QueryClient, QueryClientProvider } from 'react-query';

/* Pages */
import LandingPage from './Pages/Landing Page/LandingPage';
import CoursePage from './Pages/CoursePage/CoursePage';

const queryClient = new QueryClient();

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
            element: <Dashbord />,
            errorElement: <Error />,
          },
          {
            path: "Reserve",
            element: <Dashbord />,
            errorElement: <Error />,
          },
          {
            path: "LikedCourse",
            element: <Dashbord />,
            errorElement: <Error />,
          },
          {
            path: "LikedBlogs",
            element: <Dashbord />,
            errorElement: <Error />,
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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
