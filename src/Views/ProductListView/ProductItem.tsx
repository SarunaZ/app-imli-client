import Box from 'Components/Box';
import { Draggable } from 'react-beautiful-dnd';
import style from './style.module.scss';
import { useMutation } from '@apollo/client';
import DeleteButton from 'Components/DeleteButton';
import { PRODUCT_COMPLETE, PRODUCT_DELETE } from 'Schema/mutations/productMutations';
import { ReactComponent as CurvedArrow } from 'Images/icons/curved-arrow-right.svg';
import { ReactComponent as CheckMark } from 'Images/icons/checkmark.svg';
import classnames from 'classnames';
import Loader from 'Components/Loader';

interface Props {
  id: string;
  name?: string | null;
  index: number;
  isCompleted: boolean;
  onChange: () => void;
}

const ProductItem = ({ id, name, onChange, index, isCompleted }: Props) => {
  const [completeProductM, completeProductData] =
    useMutation(PRODUCT_COMPLETE, { errorPolicy: 'all' });

  const [deleteProductM, deleteProductData] =
    useMutation(PRODUCT_DELETE, { errorPolicy: 'all' });

  const deleteProduct = (id: string) => {
    deleteProductM({
      variables: {
        id
      },
      update: () => onChange()
    })
      .then(onChange);
  };

  const completeProduct = (id: string, value: boolean) => {
    completeProductM({
      variables: {
        id,
        value,
      },
      update: onChange
    })
      .then(onChange);
  };

  const productItemClass = classnames(style.productListItem, {
    [style.completed]: isCompleted
  });

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={style.productListItemWrapper}
        >
          <Box className={productItemClass}>
            <span className={style.productListItemTitle}>{name}</span>
            <div>
              <DeleteButton
                onClick={() => deleteProduct(id)}
                isLoading={deleteProductData.loading}
              />
              {!isCompleted ?
                <button type="button" onClick={() => completeProduct(id, true)}>
                  {!completeProductData.loading ?
                    <CheckMark
                      height="25px"
                    /> :
                    <Loader />}
                </button>
                :
                <button type="button" onClick={() => completeProduct(id, false)}>
                  {!completeProductData.loading ?
                    <CurvedArrow
                      height="20px"
                      className={style.returnIcon}
                    /> :
                    <Loader />}
                </button>
              }
            </div>
          </Box>
        </li>
      )}
    </Draggable>
  );
};

export default ProductItem;
