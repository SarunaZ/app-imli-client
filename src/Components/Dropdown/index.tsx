import React, { useLayoutEffect, useRef, useState } from "react";
import style from "./style.scss";
import MoreDots from "Images/icons/3-vertical-dots-icon.svg";
import classnames from "classnames";
import DropdownList from "./DropdownList";

interface Props {
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Dropdown = ({ isDisabled, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const handleMoreClick = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const dropdownButtonStyles = classnames(style.dropdownMoreButton, {
    [style.disabled]: isDisabled,
  });

  useLayoutEffect(() => {
    if (!listRef.current) return;

    const { top, left } = dropdownRef.current.getBoundingClientRect();

    listRef.current?.style.setProperty("left", `${left}px`);
    listRef.current?.style?.setProperty("top", `${top + 20}px`);
  }, [isOpen]);

  return (
    <div className={style.dropdownWrapper} ref={dropdownRef}>
      <button onClick={handleMoreClick} className={dropdownButtonStyles}>
        <MoreDots className={style.dropdownMoreIcon} height="14px" />
      </button>
      {isOpen && (
        <DropdownList
          ref={listRef}
          children={children}
          handleMoreClick={handleMoreClick}
        />
      )}
    </div>
  );
};

export default Dropdown;
