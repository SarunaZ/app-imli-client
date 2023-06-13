import React, { CSSProperties, forwardRef } from "react";
import Loader from "../Loader";
import style from "./style.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classnames from "classnames";

interface Props {
  id?: string;
  isDragable?: boolean;
  isLoading?: boolean;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (
  { isLoading = false, children, className = "", isDragable, id }: Props,
  ref: any,
) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const boxClasses = classnames({
    [style.box]: !className,
    [`${style.box} ${className}`]: className,
  });

  const dragableStyle: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragable) {
    return (
      <div className={boxClasses} style={dragableStyle}>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {children}
            <div
              data-style-sort
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            ></div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className ? `${style.box} ${className}` : style.box}
    >
      {isLoading && <Loader />}
      {!isLoading && children}
    </div>
  );
};

export default forwardRef(Box);
