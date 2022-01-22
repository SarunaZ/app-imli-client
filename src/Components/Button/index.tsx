import classnames from 'classnames';
import Loader from 'Components/Loader';
import style from './style.module.scss';

interface Props {
  isLoading?: boolean;
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
    type = 'button',
    isHollow = false,
    isPrimary = true
  }: Props) => {
  const buttonClasses = classnames(style.button, {
    [style.primary]: isPrimary && !isHollow,
    [style.hollow]: isHollow
  });

  const loaderClasses = classnames(style.loader, {
    [style.active]: isLoading
  });

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
      <div className={loaderClasses}>
        <Loader/>
      </div>
    </button>
  );
};

export default Button;
