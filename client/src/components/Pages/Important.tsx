import { useEffect, useState } from "react";
import { Todo } from "../../App";
import Todos from "../Todos";
import AddButton from "../AddButton";
import { toast } from "react-toastify";

const Important = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:8080/todo/important").then(async (res) => {
        const data: Todo[] | { message: string } = await res.json();
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          toast.error(data.message);
        }
      });
    } catch (error) {
      toast.error("Failed to fetch important tasks");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Todos data={todos} onFetchData={fetchData} />
      <AddButton dataFetch={fetchData} />
    </div>
  );
};

export default Important;
