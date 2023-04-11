import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './style.scss';

interface Props {
  children: React.ReactChild | React.ReactChild[]
}

const PORTAL_MODAL_ID = "portal";

export default function Modal({ children }: Props) {
  const portalElement =
    document.getElementById(PORTAL_MODAL_ID) || document.createElement("div");

  useEffect(() => {
    if (portalElement.getAttribute("id") !== PORTAL_MODAL_ID) {
      const body = document.querySelector('body');
      portalElement.setAttribute("id", PORTAL_MODAL_ID);
      body?.appendChild(portalElement);
    }

    return () => {
      document.getElementById(PORTAL_MODAL_ID)!.remove();
    }
  }, [portalElement]);

  return createPortal(
    <div className={style.modalWrapper}>{children}</div>,
    portalElement
  )
}
