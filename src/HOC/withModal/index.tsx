import React, { useEffect } from "react";
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
  return (props: P & ModalProps) => {
    const { isOpen, onClose, title } = props;

    if (!isOpen) {
      return null;
    }

    const onModalClose = () => {
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

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
}
