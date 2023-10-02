import React, { CSSProperties, forwardRef } from "react";
import Loader from "../Loader";
import style from "./style.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id?: string;
  isDragable?: boolean;
  isLoading?: boolean;
  children: JSX.Element | JSX.Element[];
}

const Box = (
  { isLoading = false, children, isDragable, id }: Props,
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

  const dragableStyle: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragable) {
    return (
      <div className={style.box} style={dragableStyle}>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <div
              data-style-sort
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            >
              {children}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={style.box}>
      {isLoading && <Loader />}
      {!isLoading && children}
    </div>
  );
};

export default forwardRef(Box);
