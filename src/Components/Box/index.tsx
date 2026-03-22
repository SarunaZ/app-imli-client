import { createElement, CSSProperties, ReactNode, RefObject } from "react";
import Loader from "../Loader";
import style from "./style.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classnames from "classnames";

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
}


function Box(props: Props<"div">): JSX.Element;
function Box(props: Props<"li">): JSX.Element;
function Box(props: Props<"p">): JSX.Element;
function Box(
  {
    ref,
    as: Component,
    id,
    title,
    children,
    isLoading = false,
    isDraggable,
    dropdownComponent,
  }: Props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const dragableStyle: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const boxContent = (
    <>
      <div
        className={classnames(style.boxHeader, {
          [style.right]: !title && dropdownComponent,
        })}
      >
        {title && <h2 className={style.boxTitle}>{title}</h2>}
        {dropdownComponent}
      </div>
      {children}
    </>
  );

  const renderedContent = (
    <>
      {isLoading && <Loader />}
      {!isLoading && boxContent}
    </>
  );

  if (isDraggable) {
    return (
      <Component
        className={style.box}
        style={dragableStyle}
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
      className: style.box,
    },
    renderedContent,
  );
}

export default Box;
