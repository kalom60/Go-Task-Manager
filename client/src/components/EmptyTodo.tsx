import React from "react";
import TodoLogo from "../assets/check copy.png";
// import List from "../assets/list.png";
// import TODO from "../assets/to-do-list copy.png";

const EmptyTodo: React.FC = () => {
  return (
    <div
      className="columns is-vcentered is-centered is-mobile is-flex is-flex-direction-column"
      style={{ height: "600px" }}
    >
      <img
        src={TodoLogo}
        alt="Todo"
        style={{ width: "250px", height: "250px" }}
      />
      <div className="is-size-4 has-text-weight-bold mt-5 pr-6">
        No Todo Found
      </div>
    </div>
  );
};

export default EmptyTodo;
