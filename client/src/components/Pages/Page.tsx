import { useEffect } from "react";
import { toast } from "react-toastify";
import Todos from "../Todos";
import AddButton from "../AddButton";
import EmptyTodo from "../EmptyTodo";
import { useTodo } from "../../hooks/useTodo";

type Props = {
  link: string;
};

const Page: React.FC<Props> = ({ link }) => {
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
  }, []);

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

export default Page;
