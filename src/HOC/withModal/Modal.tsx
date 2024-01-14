import { ReactNode } from "react";
import { createPortal } from "react-dom";
import style from "./style.scss";

interface Props {
  children: ReactNode | ReactNode[];
}

const Modal = ({ children }: Props) =>
  createPortal(
    <div className={style.modalWrapper}>{children}</div>,
    document.body,
  );

export default Modal;
