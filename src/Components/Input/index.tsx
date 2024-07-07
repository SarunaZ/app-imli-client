import React from "react";
import classnames from "classnames";
import { forwardRef } from "react";
import style from "./style.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  className?: string;
  color?: "white" | "black" | "default";
}

const Input = (
  { label, name, className, color = "default", ...rest }: Props,
  ref: React.Ref<HTMLInputElement>,
) => {
  const inputFieldClasses = classnames(className, style.inputField);

  if (label) {
    return (
      <label
        className={classnames(style.inputLabel, {
          [style.white]: color === "white",
        })}
        htmlFor={name}
      >
        {label}
        <input className={style.inputField} ref={ref} name={name} {...rest} />
      </label>
    );
  }

  return (
    <input className={inputFieldClasses} ref={ref} name={name} {...rest} />
  );
};

export default forwardRef(Input);
