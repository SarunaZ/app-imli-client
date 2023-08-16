import React, { Children } from "react";
import Loader from "Components/Loader";
import style from "./style.scss";
import classnames from "classnames";

interface Props {
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const IconButton = ({ onClick, isLoading, className, children }: Props) => {
  const deleteButtonClasses = classnames(className, style.deleteButton);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <button type="button" onClick={onClick} className={deleteButtonClasses}>
      {Children.map(children, (child) => child)}
    </button>
  );
};

export default IconButton;
