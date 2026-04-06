import React, { ElementRef, SyntheticEvent, useRef } from "react";
import MoreDots from "Images/icons/3-vertical-dots-icon.svg";
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
  const [state, setState] = useState<State>({ isOpen: false });
  const dropdownRef = useRef<ElementRef<"div">>(null);

  const handleToggle = (e?: SyntheticEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      setState({ isOpen: !state.isOpen });
    }
    e?.stopPropagation();
  };

  return (
    <div className="text-center" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`relative z-[2] bg-transparent p-1 ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
      >
        <MoreDots className="h-3.5 text-text" />
      </button>
      {state.isOpen && (
        <DropdownList
          onDropdownToggle={handleToggle}
          parentRef={dropdownRef.current}
        >
          {children}
        </DropdownList>
      )}
    </div>
  );
};

export default Dropdown;
