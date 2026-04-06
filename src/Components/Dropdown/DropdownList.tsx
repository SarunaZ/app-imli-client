import React, {
  ElementRef,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  onDropdownToggle: () => void;
  parentRef: ElementRef<"div">;
}

const TOP_GAP_SIZE = 20;
const ALIGNMENT_SIZE = 10;

const DropdownList = ({ onDropdownToggle, children, parentRef }: Props) => {
  const listRef = useRef<ElementRef<"ul">>(null);

  const getIsClickedOutside = (e: Event) => {
    if (!listRef.current.contains(e.target as Node)) {
      onDropdownToggle();
    }
  };

  const handleItemClick = (e: SyntheticEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onDropdownToggle();
  };

  const calculatePosition = () => {
    const { x, y } = parentRef.getBoundingClientRect();
    const clientWidth = document.documentElement.clientWidth;
    const listSize = listRef.current.getBoundingClientRect().width;
    const xOffset = clientWidth < listSize + x ? x - listSize + ALIGNMENT_SIZE : x;

    listRef.current?.style.setProperty("left", `${xOffset}px`);
    listRef.current?.style?.setProperty("top", `${y + TOP_GAP_SIZE}px`);
  };

  useLayoutEffect(() => {
    calculatePosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", calculatePosition);
    document.addEventListener("mousedown", getIsClickedOutside);

    return () => {
      window.removeEventListener("resize", calculatePosition);
      document.removeEventListener("mousedown", getIsClickedOutside);
    };
  }, []);

  const template = (
    <ul
      ref={listRef}
      className="fixed z-[3] w-full max-w-[120px] rounded-lg border border-border bg-dropdown-bg p-2 shadow-lg"
    >
      {React.Children.map(children, (child) => (
        <li
          onClick={handleItemClick}
          className="cursor-pointer rounded-md px-2 py-1.5 transition-colors hover:bg-surface-alt"
        >
          {child}
        </li>
      ))}
    </ul>
  );

  return createPortal(template, document.body);
};

export default DropdownList;
