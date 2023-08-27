import React, { useRef, useState } from "react";
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
  const dropdownPosition = dropdownRef.current?.getBoundingClientRect();

  const handleDropdownToggle = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const dropdownButtonStyles = classnames(style.dropdownMoreButton, {
    [style.disabled]: isDisabled,
  });

  return (
    <div className={style.dropdownWrapper} ref={dropdownRef}>
      <button onClick={handleDropdownToggle} className={dropdownButtonStyles}>
        <MoreDots className={style.dropdownMoreIcon} height="14px" />
      </button>
      {isOpen && (
        <DropdownList
          ref={listRef}
          onDropdownToggle={handleDropdownToggle}
          parrentOffset={{ x: dropdownPosition.x, y: dropdownPosition.y }}
        >
          {children}
        </DropdownList>
      )}
    </div>
  );
};

export default Dropdown;
