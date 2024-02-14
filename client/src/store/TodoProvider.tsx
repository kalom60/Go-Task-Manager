import React, { ReactNode, useState } from "react";
import { Todo } from "../App";
import {
  deleteTodoService,
  get,
  patch,
  post,
  put,
  refreshToken,
} from "../service/api";
import TodoContext, { PostTodoType, TodoType } from "./todo-context";

type Props = {
  children: ReactNode;
};

type State = Todo[];

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<State>([]);

  const getTodos = async (link?: string) => {
    try {
      const res: Todo[] = await get(link);
      setTodos(res);
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (err.status === 401) {
          try {
            await refreshAccessToken();
            const res: Todo[] = await get(link);
            setTodos(res);
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "status" in err &&
              "message" in err
            ) {
              if (typeof err.message === "string") {
                throw new Error(err.message);
              }
            }
          }
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
        }
      }
    }
  };

  const postTodo = async (data: PostTodoType) => {
    try {
      await post(JSON.stringify(data));
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (err.status === 401) {
          try {
            await refreshAccessToken();
            await post(JSON.stringify(data));
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "status" in err &&
              "message" in err
            ) {
              if (typeof err.message === "string") {
                throw new Error(err.message);
              }
            }
          }
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
        }
      }
    }
  };

  const editTodo = async (id: number, data: TodoType) => {
    try {
      await put(id, JSON.stringify(data));
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (err.status === 401) {
          try {
            await refreshAccessToken();
            await put(id, JSON.stringify(data));
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "status" in err &&
              "message" in err
            ) {
              if (typeof err.message === "string") {
                throw new Error(err.message);
              }
            }
          }
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
        }
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoService(id);
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (err.status === 401) {
          try {
            await refreshAccessToken();
            await deleteTodoService(id);
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "status" in err &&
              "message" in err
            ) {
              if (typeof err.message === "string") {
                throw new Error(err.message);
              }
            }
          }
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
        }
      }
    }
  };
  const toggleCompletion = async (id: number, body: { Completed: boolean }) => {
    try {
      await patch(id, JSON.stringify(body));
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (err.status === 401) {
          try {
            await refreshAccessToken();
            await patch(id, JSON.stringify(body));
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "status" in err &&
              "message" in err
            ) {
              if (typeof err.message === "string") {
                throw new Error(err.message);
              }
            }
          }
        } else {
          if (typeof err.message === "string") {
            throw new Error(err.message);
          }
        }
      }
    }
  };

  const refreshAccessToken = async () => {
    await refreshToken();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        getTodos,
        postTodo,
        deleteTodo,
        toggleCompletion,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
