import Box from 'Components/Box';
import { Draggable } from 'react-beautiful-dnd';
import style from './style.module.scss';
import { useMutation } from '@apollo/client';
import { PRODUCT_DELETE } from 'Schema/mutations';
import DeleteButton from 'Components/DeleteButton';

interface Props {
  id: string;
  name?: string | null;
  index: number;
  onChange: () => void;
}

const ProductItem = ({ id, name, onChange, index }: Props) => {
  const [deleteProductM, deleteProductData] = useMutation(PRODUCT_DELETE);

  const deleteProduct = (id: string) => {
    deleteProductM({
      variables: {
        id
      }
    })
    .then(onChange);
  };

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
            <DeleteButton
              onClick={() => deleteProduct(id)}
              isLoading={deleteProductData.loading}
            />
          </Box>
        </li>
      )}
    </Draggable>
  );
};

export default ProductItem;
