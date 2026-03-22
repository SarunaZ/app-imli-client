import { createElement, CSSProperties, ReactNode, RefObject } from "react";
import Loader from "../Loader";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type BoxTag = "div" | "li" | "p";

type ElementByTag = {
  div: HTMLDivElement;
  li: HTMLLIElement;
  p: HTMLParagraphElement;
};

interface Props<TTag extends BoxTag = BoxTag> {
  id?: string;
  as: TTag;
  ref?: RefObject<ElementByTag[TTag]>;
  title?: string;
  isDraggable?: boolean;
  isLoading?: boolean;
  children: ReactNode | ReactNode[];
  dropdownComponent?: ReactNode;
  className?: string;
}

function Box(props: Props<"div">): JSX.Element;
function Box(props: Props<"li">): JSX.Element;
function Box(props: Props<"p">): JSX.Element;
function Box({
  ref,
  as: Component,
  id,
  title,
  children,
  isLoading = false,
  isDraggable,
  dropdownComponent,
  className = "",
}: Props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const dragStyle: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const boxContent = (
    <>
      <div className={`flex w-full items-center ${title ? "justify-between" : "justify-end"}`}>
        {title && <h2 className="m-0 text-lg font-semibold text-text">{title}</h2>}
        {dropdownComponent}
      </div>
      {children}
    </>
  );

  const renderedContent = isLoading ? <Loader /> : boxContent;
  const baseClasses = `rounded-xl bg-surface-alt p-4 shadow-sm transition-shadow hover:shadow-md ${className}`;

  if (isDraggable) {
    return (
      <Component
        className={baseClasses}
        style={dragStyle}
        data-style-sort
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {renderedContent}
      </Component>
    );
  }

  const typedRefByTag = {
    div: ref as RefObject<HTMLDivElement> | undefined,
    li: ref as RefObject<HTMLLIElement> | undefined,
    p: ref as RefObject<HTMLParagraphElement> | undefined,
  };

  return createElement(
    Component,
    {
      ref: typedRefByTag[Component],
      className: baseClasses,
    },
    renderedContent,
  );
}

export default Box;
