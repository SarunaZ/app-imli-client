import React, { useEffect, useLayoutEffect, useRef } from "react";
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

const DropdownList = ({ onDropdownToggle, children, parrentOffset }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  const getIsClickedOutside = (e: Event) => {
    if (!listRef.current.contains(e.target as Node)) {
      onDropdownToggle();
    }
  };

  useLayoutEffect(() => {
    const { x, y } = parrentOffset;

    listRef.current?.style.setProperty("left", `${x}px`);
    listRef.current?.style?.setProperty("top", `${y + 20}px`);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", getIsClickedOutside);

    return () => {
      document.removeEventListener("mousedown", getIsClickedOutside);
    };
  }, []);

  const template = (
    <ul ref={listRef} className={style.dropdownList}>
      {React.Children.map(children, (child) => (
        <li onClick={onDropdownToggle} className={style.dropdownItem}>
          {child}
        </li>
      ))}
    </ul>
  );

  return createPortal(template, document.body);
};

export default DropdownList;
