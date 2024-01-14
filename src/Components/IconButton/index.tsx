import React from "react";
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
  const iconButtonClasses = classnames(className, style.iconButton);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <button type="button" onClick={onClick} className={iconButtonClasses}>
      {children}
    </button>
  );
};

export default IconButton;
