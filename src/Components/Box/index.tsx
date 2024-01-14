import { CSSProperties, ElementRef, forwardRef } from "react";
import Loader from "../Loader";
import style from "./style.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id?: string;
  title?: string;
  isDragable?: boolean;
  isLoading?: boolean;
  children: JSX.Element | JSX.Element[];
}

const Box = forwardRef<ElementRef<"div">, Props>(
  ({ isLoading = false, children, isDragable, id, title }, ref) => {
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
        {title && <h2 className={style.boxTitle}>{title}</h2>}
        {children}
      </>
    );

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
                {boxContent}
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={style.box}>
        {isLoading && <Loader />}
        {!isLoading && boxContent}
      </div>
    );
  },
);

export default Box;
