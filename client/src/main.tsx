// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Important from "./components/Pages/Important.tsx";
import Completed from "./components/Pages/Completed.tsx";
import Wait from "./components/Pages/Wait.tsx";
import Today from "./components/Pages/Today.tsx";
import SignUp from "./components/Pages/SignUp.tsx";
import SignIn from "./components/Pages/SignIn.tsx";
import { PrivateRoute } from "./auth/PrivateRoute.tsx";
import AuthProvider from "./store/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <App />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/important",
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <Important />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/completed",
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <Completed />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/waiting",
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <Wait />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/today",
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <Today />
        </>
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>
);
