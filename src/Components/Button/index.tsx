import React from "react";
import classnames from "classnames";
import Loader from "Components/Loader";
import style from "./style.scss";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isStyleStripped?: boolean;
  children?: React.ReactNode;
  buttonStyle?: "prime" | "hollow" | "none";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  isLoading,
  className,
  isDisabled,
  type = "button",
  buttonStyle = "prime",
  ...rest
}: Props) => {
  const buttonClasses = classnames(className, {
    [style.primary]: buttonStyle === "prime",
    [style.hollow]: buttonStyle === "hollow",
    [style.disabled]: isDisabled || isLoading,
    [style.button]: buttonStyle !== "none",
  });

  return (
    <button {...rest} type={type} className={buttonClasses}>
      {isLoading && <Loader />}
      {!isLoading && children}
    </button>
  );
};

export default Button;
