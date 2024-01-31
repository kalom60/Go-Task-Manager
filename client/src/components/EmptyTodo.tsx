import React from "react";

type Props = {
  message: string;
};

const EmptyTodo: React.FC<Props> = ({ message }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">{message}</div>
      </div>
    </div>
  );
};

export default EmptyTodo;
