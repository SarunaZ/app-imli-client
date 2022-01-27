import Loader from 'Components/Loader';
import { ApolloError, useMutation } from '@apollo/client';
import ProductItem from './ProductItem';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Product } from 'Schema/types';
import style from './style.module.scss';
import ProductAddForm from './ProductAddForm';
import { useEffect, useRef } from 'react';
import ErrorHandler from 'Components/ErrorHandler';
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from 'Schema/mutations/productMutations';

interface Props {
  data: Product[];
  onChange: () => void;
  isLoading?: boolean;
  error?: ApolloError;
}

const ProductList = ({ data, isLoading, error, onChange }: Props) => {
  const deleteRef = useRef<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [updateProductListM] =
    useMutation(PRODUCTS_LIST_ORDER_UPDATE_MUTATION, { errorPolicy: 'all' });

  useEffect(() => {

    if (!deleteRef.current) {
      listRef.current?.scroll({
        top: listRef?.current?.scrollHeight!,
        behavior: 'smooth'
      })
    }

    deleteRef.current = false;
  }, [data?.length])

  if (isLoading) {
    return (
      <>
        <Loader />
        <ProductAddForm onChange={onChange} />
      </>
    );
  }

  if (!isLoading && !data?.length) {
    return (
      <>
        <p>No data found</p>
        <ProductAddForm onChange={onChange} />
      </>
    );
  }

  const onDragEd = (result: DropResult) => {
    const { source, destination } = result;
    const items = data && Array.from(data);

    if (items && destination) {
      const [newOrder] = items.splice(source.index, 1);
      items?.splice(destination.index, 0, newOrder);

      const newList = items.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });

      updateProductListM({
        variables: { newList },
        update: () => onChange()
      });
    }
  };

  const handleDeleteItem = () => {
    onChange();
    deleteRef.current = true;
  }

  return (
    <>
      <ErrorHandler error={error} />
      <ul ref={listRef} className={style.productList}>
        <DragDropContext onDragEnd={onDragEd}>
          <Droppable droppableId="productList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} >
                <div className={style.placeholder}>
                  {provided.placeholder}
                </div>
                {data?.map((product: Product, index: number) => (
                  <ProductItem
                    index={index}
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    onChange={handleDeleteItem}
                  />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
      <ProductAddForm onChange={onChange} />
    </>
  );
};

export default ProductList;
