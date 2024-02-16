import * as React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

type ModalProps = {
  children: React.ReactNode;
};

type BacdropProps = {
  onClose: () => void;
};

const Backdrop: React.FC<BacdropProps> = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal: React.FC<Props> = (props) => {
  return (
    <>
      {portalElement &&
        ReactDOM.createPortal(
          <Backdrop onClose={props.onClose} />,
          portalElement,
        )}
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay> {props.children}</ModalOverlay>,
          portalElement,
        )}
    </>
  );
};

export default Modal;
