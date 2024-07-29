import React, { useEffect } from "react";
import Modal from "./Modal";
import style from "./style.scss";
import Close from "Images/icons/close.svg";
import { Helmet } from "react-helmet-async";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  modalWrapperClassName?: string;
}

export default function withModal<P>(
  Component: React.ComponentType<P & ModalProps>,
) {
  return (props: P & ModalProps) => {
    const { isOpen, onClose, title, modalWrapperClassName } = props;

    const onModalClose = () => {
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    useEffect(() => {
      if (!isOpen) {
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    if (!isOpen) {
      return null;
    }

    return (
      <>
        <Helmet>
          <body className={style.noScroll} />
        </Helmet>
        <Modal modalWrapperClassName={modalWrapperClassName}>
          <div className={style.modalContent}>
            <h3 className={style.modalTitle}>{title}</h3>
            <button className={style.modalCloseButton} onClick={onModalClose}>
              <Close />
            </button>
            <Component {...props} />
          </div>
        </Modal>
      </>
    );
  };
}
