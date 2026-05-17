import { CSSProperties } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
}

const Skeleton = ({ className = "", style }: Props) => (
  <div
    aria-hidden="true"
    style={style}
    className={`animate-pulse rounded-md bg-surface-alt ${className}`}
  />
);

export default Skeleton;
