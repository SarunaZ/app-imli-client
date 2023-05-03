import React from "react";
import classnames from "classnames";
import Loader from "Components/Loader";
import style from "./style.scss";

interface Props {
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isPrimary?: boolean;
  isHollow?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({
  onClick,
  children,
  isLoading,
  className,
  isDisabled,
  type = "button",
  isHollow = false,
  isPrimary = true,
}: Props) => {
  const buttonClasses = classnames(
    className,
    style.button,
    style.primary,
    {
      [style.primary]: isPrimary && !isHollow,
      [style.hollow]: isHollow,
      [style.disabled]: isDisabled || isLoading,
    },
  );

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {isLoading && <Loader />}
      {!isLoading && children}
    </button>
  );
};

export default Button;
