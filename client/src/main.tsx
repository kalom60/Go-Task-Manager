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
import SignUp from "./components/Auth/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUp />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    ),
  },
  {
    path: "/important",
    element: (
      <>
        <Navbar />
        <Important />
        {/* ToastContainer */}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    ),
  },
  {
    path: "/completed",
    element: (
      <>
        <Navbar />
        <Completed />
        {/* ToastContainer */}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    ),
  },
  {
    path: "/waiting",
    element: (
      <>
        <Navbar />
        <Wait />
        {/* ToastContainer */}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    ),
  },
  {
    path: "/today",
    element: (
      <>
        <Navbar />
        <Today />
        {/* ToastContainer */}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
