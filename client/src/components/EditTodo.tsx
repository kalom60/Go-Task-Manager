import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Edit3 } from "react-feather";
import "./Custom-CSS.css";
import { useTodo } from "../hooks/useTodo";
import { useLocation } from "react-router-dom";

export interface TodoState {
  ID: number;
  UserID: number;
  Todo: string;
  Description: string;
  Date: string;
  Completed: boolean;
  Important: boolean;
}

interface Props {
  flag?: boolean;
  data: TodoState;
  onToggleModal: () => void;
}

const EditTodo: React.FC<Props> = ({ data, onToggleModal }) => {
  const todoHook = useTodo();
  const [todo, setTodo] = useState<TodoState>(data);
  const { pathname } = useLocation();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if ((event.target as HTMLInputElement).type === "checkbox") {
      setTodo({
        ...todo,
        [event.target.name]: (event.target as HTMLInputElement).checked,
      });
    } else {
      setTodo({
        ...todo,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await todoHook.editTodo(todo.ID, todo);
      await todoHook.getTodos(pathname);
      onToggleModal();
      toast.success("Todo Successfully Updated!");
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
      } else {
        toast.error("Failed to update todo");
      }
    }
  };

  return (
    <div className="columns is-centered">
      <div className="column">
        <form className="box p-5" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="e.g. wash dishes"
                name="Todo"
                value={todo.Todo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="e.g. wash dishes from the Holiday event"
                name="Description"
                value={todo.Description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input
                type="date"
                className="input"
                placeholder="e.g. wash dishes"
                name="Date"
                value={todo.Date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field mt-5">
            <div className="control">
              <label className="checkbox is-flex is-justify-content-space-between">
                <label className="label">Toggle Completed</label>
                <input
                  type="checkbox"
                  name="Completed"
                  checked={todo.Completed}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox is-flex is-justify-content-space-between">
                <label className="label">Toggle Important</label>
                <input
                  type="checkbox"
                  name="Important"
                  checked={todo.Important}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div
            className="control mt-5"
            style={{ display: "flex", justifyContent: "flex-end" }}
            id="submitBtn"
          >
            <button className="button is-rounded is-primary">
              <Edit3 size={18} style={{ marginRight: "8px" }} /> Edit Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
