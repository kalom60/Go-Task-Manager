// import { Plus } from "react-feather";

import { useState } from "react";
import Input from "./Input";
import { Plus } from "react-feather";

const AddButton: React.FC = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <div className="">
      <button
        type="button"
        className="button is-primary is-rounded fixed-bottom-right circle"
        onClick={toggleModal}
      >
        <Plus />
      </button>
      <div className={`modal ${isModalActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-content">
          <Input onToggleModal={toggleModal} />
        </div>
        <button
          className="modal-close is-large"
          onClick={toggleModal}
          aria-label="close"
        ></button>
      </div>
    </div>
  );
};

export default AddButton;
