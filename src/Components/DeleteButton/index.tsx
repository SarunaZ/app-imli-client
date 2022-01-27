import Loader from 'Components/Loader';
import style from './style.module.scss';
import { ReactComponent as Delete } from 'Images/icons/delete.svg';
import classnames from 'classnames';

interface Props {
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const DeleteButton = ({ onClick, isLoading, className }: Props) => {
  const deleteButtonClasses = classnames(className, style.deleteButton);

  if (isLoading) {
    return <Loader />
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={deleteButtonClasses}
    >
      <Delete />
    </button>
  );
};

export default DeleteButton;
