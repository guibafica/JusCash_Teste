import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { Register } from "./routes/register";
import { Login } from "./routes/login";

import { AppProvider } from "./hooks";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/signIn",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppProvider>
  </React.StrictMode>
);
