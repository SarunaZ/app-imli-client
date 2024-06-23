import { ReactNode } from "react";
import { createPortal } from "react-dom";
import style from "./style.scss";
import classnames from "classnames";

interface Props {
  children: ReactNode | ReactNode[];
  modalWrapperClassName?: string;
}

const Modal = ({ children, modalWrapperClassName }: Props) =>
  createPortal(
    <div className={classnames(style.modalWrapper, modalWrapperClassName)}>
      {children}
    </div>,
    document.body,
  );

export default Modal;
