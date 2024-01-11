import "./App.css";
// import Input from "./components/Input";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todos from "./components/Todos";
import { useEffect, useState } from "react";
import AddButton from "./components/AddButton";

export interface Todo {
  ID: number;
  Todo: string;
  Description: string;
  Date: string;
  Completed: boolean;
  Important: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:8080/todo").then(async (res) => {
        const data: Todo[] = await res.json();
        setTodos(data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <Input onFetchData={fetchData} /> */}
      <Todos data={todos} onFetchData={fetchData} />
      <AddButton dataFetch={fetchData} />
      <ToastContainer position="bottom-left" />
    </>
  );
}

export default App;
