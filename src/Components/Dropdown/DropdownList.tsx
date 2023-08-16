import React, { useEffect, useRef } from "react";
import style from "./style.scss";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownList = ({ children, onClick }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  console.log(listRef.current?.offsetHeight);

  return (
    <>
      <ul ref={listRef} className={style.dropdownList}>
        {React.Children.map(children, (child) => (
          <li onClick={onClick} className={style.dropdownItem}>
            {child}
          </li>
        ))}
      </ul>
      <span
        onDrag={onClick}
        onClick={onClick}
        className={style.dropdownOverlay}
      />
    </>
  );
};

export default DropdownList;
