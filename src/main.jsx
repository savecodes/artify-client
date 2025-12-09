import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./components/LoadingSpinner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
