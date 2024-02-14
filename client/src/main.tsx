// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import SignUp from "./components/Pages/SignUp.tsx";
import SignIn from "./components/Pages/SignIn.tsx";
import { PrivateRoute } from "./auth/PrivateRoute.tsx";
import AuthProvider from "./store/AuthProvider.tsx";
import TodoProvider from "./store/TodoProvider.tsx";

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
        <TodoProvider>
          <Navbar />
          <App link="" />
        </TodoProvider>
      </PrivateRoute>
    ),
  },
  {
    path: "/important",
    element: (
      <PrivateRoute>
        <TodoProvider>
          <Navbar />
          <App link="important" />
        </TodoProvider>
      </PrivateRoute>
    ),
  },
  {
    path: "/completed",
    element: (
      <PrivateRoute>
        <TodoProvider>
          <Navbar />
          <App link="completed" />
        </TodoProvider>
      </PrivateRoute>
    ),
  },
  {
    path: "/waiting",
    element: (
      <PrivateRoute>
        <TodoProvider>
          <Navbar />
          <App link="waiting" />
        </TodoProvider>
      </PrivateRoute>
    ),
  },
  {
    path: "/today",
    element: (
      <PrivateRoute>
        <TodoProvider>
          <Navbar />
          <App link="today" />
        </TodoProvider>
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
  </React.StrictMode>,
);
