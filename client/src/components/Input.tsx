import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "react-feather";
import "./Custom-CSS.css";

interface TodoState {
  todo: string;
  description: string;
  date: string;
  completed: boolean;
  important: boolean;
}

interface Props {
  onFetchData: () => void;
  onToggleModal: () => void;
}

const intialState = {
  todo: "",
  description: "",
  date: "",
  completed: false,
  important: false,
};

const Input: React.FC<Props> = ({ onFetchData, onToggleModal }) => {
  const [todo, setTodo] = useState<TodoState>(intialState);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
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

    await fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(async (res) => {
      const data = await res.json();
      setTodo(intialState);
      onFetchData();
      onToggleModal();
      toast(data.message);
    });
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
                name="todo"
                value={todo.todo}
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
                name="description"
                value={todo.description}
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
                name="date"
                value={todo.date}
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
                  name="completed"
                  checked={todo.completed}
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
                  name="important"
                  checked={todo.important}
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
              <Plus size={18} style={{ marginRight: "6px" }} /> Create Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
