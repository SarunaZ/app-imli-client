import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  className?: string;
  color?: "white" | "black" | "default";
}

const Input = (
  { label, name, className = "", color = "default", ...rest }: Props,
  ref: React.Ref<HTMLInputElement>,
) => {
  const inputClasses = `w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text transition-colors placeholder:text-text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/30 focus:outline-none ${className}`;
  const labelColor = color === "white" ? "text-white" : "text-text";

  if (label) {
    return (
      <label className={`flex flex-col gap-2 text-sm font-medium ${labelColor}`} htmlFor={name}>
        {label}
        <input className={inputClasses} ref={ref} name={name} {...rest} />
      </label>
    );
  }

  return <input className={inputClasses} ref={ref} name={name} {...rest} />;
};

export default forwardRef(Input);
