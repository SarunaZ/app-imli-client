import React, { useEffect } from "react";
import Modal from "./Modal";
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    useEffect(() => {
      if (!isOpen) {
        return () => document.removeEventListener("keydown", handleKeyDown);
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        <Helmet>
          <body className="overflow-hidden" />
        </Helmet>
        <Modal modalWrapperClassName={modalWrapperClassName}>
          <div className="relative rounded-xl bg-surface-alt p-6 shadow-2xl">
            <h3 className="mb-5 text-2xl font-bold text-text">{title}</h3>
            <button
              className="absolute right-3 top-3 p-1 text-text-muted transition-colors hover:text-text"
              onClick={onClose}
            >
              <Close />
            </button>
            <Component {...props} />
          </div>
        </Modal>
      </>
    );
  };
}
