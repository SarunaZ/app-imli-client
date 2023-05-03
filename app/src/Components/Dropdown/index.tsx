import React, { useState } from "react";
import style from "./style.scss";
import MoreDots from "Images/icons/3-vertical-dots-icon.svg";
import classnames from "classnames";

interface Props {
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Dropdown = ({ children, isDisabled }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMoreClick = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const dropdownButtonStyles = classnames(style.dropdownMoreButton, {
    [style.disabled]: isDisabled,
  });

  return (
    <div className={style.dropdownWrapper}>
      <button
        onClick={handleMoreClick}
        className={dropdownButtonStyles}
      >
        <MoreDots className={style.dropdownMoreIcon} height="14px" />
      </button>
      {isOpen && (
        <ul className={style.dropdownList}>
          {React.Children.map(children, (child) => (
            <li
              onClick={handleMoreClick}
              className={style.dropdownItem}
            >
              {child}
            </li>
          ))}
          <span
            onDrag={handleMoreClick}
            onClick={handleMoreClick}
            className={style.dropdownOverlay}
          />
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
