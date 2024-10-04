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

// ایجاد یک instance از QueryClient
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/CoursePage',
        element: <CoursePage />,
      }
    ]
  }
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
