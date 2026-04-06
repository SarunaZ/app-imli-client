import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode | ReactNode[];
  modalWrapperClassName?: string;
}

const Modal = ({ children, modalWrapperClassName = "" }: Props) =>
  createPortal(
    <div
      className={`fixed inset-0 z-[101] flex items-center justify-center bg-overlay backdrop-blur-sm ${modalWrapperClassName}`}
    >
      {children}
    </div>,
    document.body,
  );

export default Modal;
