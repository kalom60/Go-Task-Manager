import React from "react";
import Input from "./Input";
import { Plus } from "react-feather";
import Modal from "./UI/Modal";

const AddButton: React.FC = () => {
  const [modalIsShown, setModalIsShown] = React.useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <>
      {modalIsShown && (
        <Modal onClose={hideModalHandler}>
          <Input onClose={hideModalHandler} />
        </Modal>
      )}
      <button
        type="button"
        className="button is-primary is-rounded fixed-bottom-right circle"
        onClick={showModalHandler}
      >
        <Plus />
      </button>
    </>
  );
};

export default AddButton;
