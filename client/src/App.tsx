import "./App.css";
// import Input from "./components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todos from "./components/Todos";
import { useEffect, useState } from "react";
import AddButton from "./components/AddButton";
import EmptyTodo from "./components/EmptyTodo";
import { get, refreshToken } from "./service/api";
import { Navigate, useLocation } from "react-router-dom";

export interface Todo {
  ID: number;
  Todo: string;
  Description: string;
  Date: string;
  Completed: boolean;
  Important: boolean;
}

function App() {
  const location = useLocation();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:8080/todo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then(async (res) => {
        const data: Todo[] | { message: string } = await res.json();
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          toast.error(data.message);
        }
      });
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshToken();
        const res: Todo[] = await get();
        setTodos(res);
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          "message" in err
        ) {
          if (err.status === 401) {
            setShouldNavigate(true);
          } else {
            if (typeof err.message === "string") {
              toast.error(err.message);
            }
          }
        }
      }
    };

    const fetchTodos = async () => {
      try {
        const res: Todo[] = await get();
        setTodos(res);
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          "message" in err
        ) {
          if (err.status === 401) {
            refresh();
          } else {
            if (typeof err.message === "string") {
              toast.error(err.message);
            }
          }
        }
      }
    };

    fetchTodos();
  }, []);

  if (shouldNavigate) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (todos.length === 0) {
    return (
      <>
        <EmptyTodo />
        <AddButton dataFetch={fetchData} />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }

  return (
    <>
      {/* <Input onFetchData={fetchData} /> */}
      <Todos data={todos} onFetchData={fetchData} />
      <AddButton dataFetch={fetchData} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
