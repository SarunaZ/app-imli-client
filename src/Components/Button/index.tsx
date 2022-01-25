import classnames from 'classnames';
import Loader from 'Components/Loader';
import style from './style.module.scss';

interface Props {
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isPrimary?: boolean;
  isHollow?: boolean;
  children?: React.ReactChild;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = (
  {
    onClick,
    children,
    isLoading,
    className,
    isDisabled,
    type = 'button',
    isHollow = false,
    isPrimary = true
  }: Props) => {
  const buttonClasses = classnames(className, style.button, {
    [style.primary]: isPrimary && !isHollow,
    [style.hollow]: isHollow,
    [style.disabled]: isDisabled
  });

  return (
    <button
      type={type}
      disabled={isLoading || isDisabled}
      className={buttonClasses}
      onClick={onClick}
    >
      {isLoading && <Loader/>}
      {!isLoading && children}
    </button>
  );
};

export default Button;
