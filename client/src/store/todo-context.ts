import { createContext } from "react";

export type TodoType = {
  ID: number;
  UserID: number;
  Todo: string;
  Description: string;
  Date: string;
  Completed: boolean;
  Important: boolean;
};

export type PostTodoType = {
  Todo: string;
  Description: string;
  Date: string;
  Completed: boolean;
  Important: boolean;
};

type TodoContextProps = {
  todos: TodoType[];
  getTodos: (link?: string) => void;
  postTodo: (data: PostTodoType) => void;
  deleteTodo: (id: number) => void;
  toggleCompletion: (id: number, body: { Completed: boolean }) => void;
  editTodo: (id: number, body: TodoType) => void;
};

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export default TodoContext;
