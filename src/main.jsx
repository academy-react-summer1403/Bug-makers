import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider, useSelector } from "react-redux";
import { Store } from "../src/Redux/Store/Store";
import { QueryClient, QueryClientProvider } from "react-query";
import "./i18n.js";
import Rooter from "./Rooter/Rooter.jsx";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <Suspense fallback={<>loading</>}>
          <NextUIProvider>
            <Rooter />
            <Toaster
              // toastOptions={{
              //   style: {
              //     background: dark.bgHigh,
              //     color: dark.textHigh,
              //   },
              // }}
            />
          </NextUIProvider>
        </Suspense>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);