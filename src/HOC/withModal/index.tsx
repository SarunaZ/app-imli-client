import React from "react";
import Modal from "./Modal";
import style from "./style.scss";
import Close from "Images/icons/close.svg";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function withModal<P>(
  Component: React.ComponentType<P & ModalProps>,
) {
  const WithModalComponent = (props: P & ModalProps) => {
    const { isOpen, onClose, title } = props;

    if (!isOpen) {
      return null;
    }

    const onModalClose = () => {
      onClose();
    };

    return (
      <Modal>
        <div className={style.modalContent}>
          <h3 className={style.modalTitle}>{title}</h3>
          <button className={style.modalCloseButton} onClick={onModalClose}>
            <Close />
          </button>
          <Component {...props} />
        </div>
      </Modal>
    );
  };

  return WithModalComponent;
}
