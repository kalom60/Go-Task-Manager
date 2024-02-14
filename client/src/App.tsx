import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todos from "./components/Todos";
import { useEffect } from "react";
import AddButton from "./components/AddButton";
import EmptyTodo from "./components/EmptyTodo";
import { useTodo } from "./hooks/useTodo";

export interface Todo {
  ID: number;
  UserID: number;
  Todo: string;
  Description: string;
  Date: string;
  Completed: boolean;
  Important: boolean;
}

type Props = {
  link: string;
};

const App: React.FC<Props> = ({ link }) => {
  const todo = useTodo();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        todo.getTodos(link);
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          "message" in err
        ) {
          if (typeof err.message === "string") {
            toast.error(err.message);
          }
        }
      }
    };

    fetchTodos();
  }, [link]);

  if (todo.todos?.length === 0) {
    return (
      <div>
        <EmptyTodo />
        <AddButton />
      </div>
    );
  }

  return (
    <div>
      <Todos />
      <AddButton />
    </div>
  );
};

export default App;
