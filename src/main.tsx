import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "../src/contexts/AuthContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
