import Loader from 'Components/Loader';
import { ApolloError, useMutation } from '@apollo/client';
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from 'Schema/mutations';
import ProductItem from './ProductItem';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Product } from 'Schema/types';
import style from './style.module.scss';
import ProductAddForm from './ProductAddForm';
import { useRef } from 'react';

interface Props {
  data: Product[];
  onChange: () => void;
  isLoading?: boolean;
  error?: ApolloError;
}

const ProductList = ({ data, isLoading, error, onChange }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [updateProductListM, updateProductListMData] =
    useMutation(PRODUCTS_LIST_ORDER_UPDATE_MUTATION);

  if (isLoading) {
    return <Loader />;
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

  const handleProductAdd = () => {
    onChange();

    //TODO: Find better solution for scrolling into view
    // This is not the right way to do it, but im sleep deprived
    setTimeout(() => {
      !isLoading && listRef.current?.scroll({
        top: listRef?.current?.scrollHeight!,
        behavior: 'smooth'
      })
    }, 250);

  }

  return (
    <>
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
                    onChange={onChange}
                  />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
      <ProductAddForm onChange={handleProductAdd} />
    </>
  );
};

export default ProductList;
