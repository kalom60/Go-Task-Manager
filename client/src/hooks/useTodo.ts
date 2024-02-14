import { useContext } from "react";
import TodoContext from "../store/todo-context";

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodo must be used within an TodoProvider");
  }

  return context;
};
