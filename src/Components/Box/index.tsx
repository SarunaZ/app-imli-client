import { CSSProperties, ElementRef, forwardRef, ReactNode } from "react";
import Loader from "../Loader";
import style from "./style.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id?: string;
  as: "div" | "li" | "p";
  title?: string;
  isDraggable?: boolean;
  isLoading?: boolean;
  children: ReactNode | ReactNode[];
  dropdownComponent?: ReactNode;
}

const Box = forwardRef<
  ElementRef<"div"> | ElementRef<"p"> | ElementRef<"li">,
  Props
>(
  (
    {
      as: Component,
      id,
      title,
      children,
      isLoading = false,
      isDraggable,
      dropdownComponent,
    },
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

    const boxContent = (
      <>
        {title && dropdownComponent && (
          <div className={style.boxHeader}>
            <h2 className={style.boxTitle}>{title}</h2>
            {dropdownComponent}
          </div>
        )}
        {title && !dropdownComponent && (
          <h2 className={style.boxTitle}>{title}</h2>
        )}
        {children}
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
          <>
            {isLoading && <Loader />}
            {!isLoading && boxContent}
          </>
        </Component>
      );
    }

    return (
      <Component ref={ref} className={style.box}>
        {isLoading && <Loader />}
        {!isLoading && boxContent}
      </Component>
    );
  },
);

export default Box;
