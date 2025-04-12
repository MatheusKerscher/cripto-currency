import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Bounce, ToastContainer } from "react-toastify";

import "./index.css";
import AppRoutes from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
    <AppRoutes />
  </StrictMode>
);
