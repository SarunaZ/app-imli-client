import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import style from "./style.scss";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  onDropdownToggle: () => void;
  parrentOffset: {
    x: number;
    y: number;
  };
}

const DropdownList = (
  { onDropdownToggle, children, parrentOffset }: Props,
  ref: any,
) => {
  const getIsClicketOutside = () => {
    if (
      ref.current.getBoundingClientRect().y !== parrentOffset.y ||
      ref.current.getBoundingClientRect().x !== parrentOffset.x
    ) {
      onDropdownToggle();
    }
  };

  useLayoutEffect(() => {
    if (!parrentOffset) return;

    const { x, y } = parrentOffset;

    ref.current?.style.setProperty("left", `${x}px`);
    ref.current?.style?.setProperty("top", `${y + 20}px`);
  }, []);

  useEffect(() => {
    document.addEventListener("click", getIsClicketOutside);

    return () => {
      document.removeEventListener("click", getIsClicketOutside);
    };
  }, []);

  const template = (
    <ul ref={ref} className={style.dropdownList}>
      {React.Children.map(children, (child) => (
        <li onClick={onDropdownToggle} className={style.dropdownItem}>
          {child}
        </li>
      ))}
    </ul>
  );

  return createPortal(template, document.body);
};

export default forwardRef(DropdownList);
