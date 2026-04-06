import { CSSProperties, forwardRef, ReactNode } from "react";
import Loader from "../Loader";
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

type Elements = HTMLDivElement | HTMLParagraphElement | HTMLLIElement;

const Box = forwardRef<Elements, Props>(
  ({
    as: Component,
    id,
    title,
    children,
    isLoading = false,
    isDraggable,
    dropdownComponent,
  }) => {
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
    const baseClasses = "rounded-xl bg-surface-alt p-4 shadow-sm transition-shadow hover:shadow-md";

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

    return (
      <Component ref={setNodeRef} className={baseClasses}>
        {renderedContent}
      </Component>
    );
  },
);

export default Box;
