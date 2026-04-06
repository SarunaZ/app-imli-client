import React from "react";
import Loader from "Components/Loader";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  buttonStyle?: "prime" | "hollow" | "none";
  type?: "button" | "submit" | "reset";
}

const styleMap = {
  prime:
    "bg-secondary text-text-inv hover:brightness-110 focus-visible:ring-2 focus-visible:ring-secondary/50",
  hollow:
    "border-2 border-secondary text-secondary hover:bg-secondary hover:text-text-inv focus-visible:ring-2 focus-visible:ring-secondary/50",
  none: "",
} as const;

const Button = ({
  children,
  isLoading,
  className = "",
  isDisabled,
  type = "button",
  buttonStyle = "prime",
  ...rest
}: Props) => {
  const base =
    buttonStyle !== "none"
      ? "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-150 cursor-pointer"
      : "";
  const disabled = isDisabled || isLoading ? "opacity-50 pointer-events-none" : "";

  return (
    <button
      {...rest}
      type={type}
      className={`${base} ${styleMap[buttonStyle]} ${disabled} ${className}`}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
