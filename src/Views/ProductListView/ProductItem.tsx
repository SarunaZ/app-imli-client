import Box from 'Components/Box';
import { Draggable } from 'react-beautiful-dnd';
import style from './style.module.scss';
import { ReactComponent as Delete } from 'Images/icons/delete.svg';

interface Props {
  id: string;
  name?: string | null;
  index: number;
  onDelete: (id: string) => void;
}

const ProductItem = ({ id, name, onDelete, index }: Props) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={style.productListItemWrapper}
        >
          <Box className={style.productListItem}>
            <span className={style.productListItemTitle}>{name}</span>
            <button
              type="button"
              className={style.productListItemDelete}
              onClick={() => onDelete(id)}
            >
              <Delete />
            </button>
          </Box>
        </li>

      )}
    </Draggable>
  );
};

export default ProductItem;
