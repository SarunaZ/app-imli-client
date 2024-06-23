import React, { ElementRef, SyntheticEvent, useRef } from "react";
import style from "./style.scss";
import MoreDots from "Images/icons/3-vertical-dots-icon.svg";
import classnames from "classnames";
import DropdownList from "./DropdownList";
import useState from "Hooks/useState";

interface Props {
  isDisabled?: boolean;
  children: React.ReactNode;
}

interface State {
  isOpen: boolean;
}

const Dropdown = ({ isDisabled, children }: Props) => {
  const [state, setState] = useState<State>({
    isOpen: false,
  });
  const dropdownRef = useRef<ElementRef<"div">>(null);
  const parentRef = dropdownRef.current;

  const handleDropdownToggle = (e?: SyntheticEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      setState({ isOpen: !state.isOpen });
    }

    e.stopPropagation();
  };

  const dropdownButtonStyles = classnames(style.dropdownMoreButton, {
    [style.disabled]: isDisabled,
  });

  return (
    <div className={style.dropdownWrapper} ref={dropdownRef}>
      <button onClick={handleDropdownToggle} className={dropdownButtonStyles}>
        <MoreDots className={style.dropdownMoreIcon} height="14px" />
      </button>
      {state.isOpen && (
        <DropdownList
          onDropdownToggle={handleDropdownToggle}
          parentRef={parentRef}
        >
          {children}
        </DropdownList>
      )}
    </div>
  );
};

export default Dropdown;
