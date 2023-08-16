import { useState } from "react";
import MoreDots from "Images/icons/3-vertical-dots-icon.svg";
import style from "./style.scss";
import classnames from "classnames";
import DropdownList from "./DropdownList";

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
      <button onClick={handleMoreClick} className={dropdownButtonStyles}>
        <MoreDots className={style.dropdownMoreIcon} height="14px" />
      </button>
      {isOpen && <DropdownList onClick={handleMoreClick} children={children} />}
    </div>
  );
};

export default Dropdown;
