import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from '../src/Redux/Store/Store';
import { QueryClient, QueryClientProvider } from 'react-query';
import './i18n.js';
import Rooter from './Rooter/Rooter.jsx'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Rooter />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
