import React from "react";
import Loader from "Components/Loader";

interface Props {
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const IconButton = ({ onClick, isLoading, className = "", children }: Props) => {
  if (isLoading) return <Loader />;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg p-1 transition-colors hover:bg-surface-alt ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
