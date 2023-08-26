import React, { forwardRef, useEffect, useRef } from "react";
import style from "./style.scss";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  handleMoreClick: () => void;
}

const DropdownList = ({ handleMoreClick, children }: Props, ref: any) => {
  const template = (
    <ul ref={ref} className={style.dropdownList}>
      {React.Children.map(children, (child) => (
        <li onClick={handleMoreClick} className={style.dropdownItem}>
          {child}
        </li>
      ))}
      <span
        onDrag={handleMoreClick}
        onClick={handleMoreClick}
        className={style.dropdownOverlay}
      />
    </ul>
  );

  return createPortal(template, document.body);
};

export default forwardRef(DropdownList);
