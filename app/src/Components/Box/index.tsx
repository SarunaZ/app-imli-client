import React from 'react';
import Loader from '../Loader';
import style from './style.scss';

interface Props {
  isLoading?: boolean;
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (
  {
    isLoading = false,
    children,
    className = ''
  }: Props, ref: any) => (
  <>
    <div
      className={
        className
          ? `${style.box} ${className}`
          : style.box
      }
    >
      {isLoading && <Loader />}
      {!isLoading && children}
    </div>
  </>
);

export default Box;
