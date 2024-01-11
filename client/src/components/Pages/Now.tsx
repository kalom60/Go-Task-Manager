import { useEffect, useState } from "react";
import { Todo } from "../../App";
import Todos from "../Todos";

const Now = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:8080/todo/now").then(async (res) => {
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
    <div>
      <Todos data={todos} onFetchData={fetchData} />
    </div>
  );
};

export default Now;
