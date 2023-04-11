import React from 'react';
import Loader from 'Components/Loader';
import { useMutation } from '@apollo/client';
import ProductItem from './ProductItem';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Product, ProductListQuery } from 'Schema/types';
import style from './style.scss';
import ProductAddForm from './ProductAddForm';
import { useEffect, useRef, useState } from 'react';
import ErrorHandler from 'Components/ErrorHandler';
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from 'Schema/mutations/productMutations';
import { useQuery } from '@apollo/client';
import { PRODUCT_LIST_DATA } from 'Schema/queries/productQueries';
import ProductListButtons from './ProductListButtons';
import Button from 'Components/Button';

type ProductListData = ProductListQuery['products'];

const ProductList = () => {
  const deleteRef = useRef<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [listData, setListData] = useState<ProductListData | undefined>(undefined);
  const { loading, error, refetch } = useQuery(PRODUCT_LIST_DATA, {
    errorPolicy: 'all',
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setListData(res.products?.map((item: any) => ({
        id: item.id,
        name: item.name,
        isDone: item.isDone
      })));
    }
  });

  const [updateProductListM, updateProductListMData] =
    useMutation(
      PRODUCTS_LIST_ORDER_UPDATE_MUTATION,
      { errorPolicy: 'all' }
    );

  const scrollToListBottom = () => {
    if (!deleteRef.current) {
      listRef.current?.scroll({
        top: listRef?.current?.scrollHeight,
        behavior: 'smooth'
      })

      anchorRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToListBottom();

    deleteRef.current = false;
  }, [listData?.length])

  const onDragEd = (result: DropResult) => {
    const { source, destination } = result;
    const items = listData && Array.from(listData);

    if (items && destination) {
      const [newOrder] = items.splice(source.index, 1);
      items?.splice(destination.index, 0, newOrder);

      const newList = items.map(item => {
        return {
          id: item.id,
          name: item.name,
          isDone: item.isDone
        };
      });

      setListData(newList);

      updateProductListM({
        fetchPolicy: 'no-cache',
        variables: { newList },
      });
    }
  };

  const updateList = (newList?: Product[]) => {
    if (newList) {
      setListData((prev => [...(prev || []), ...newList]));
      return;
    }
  }

  const handleDeleteItem = (id: string) => {
    const newList = listData?.filter(item => item.id !== id);
    setListData(newList)
    deleteRef.current = true;
  }

  const handleCompleteItem = (id: string, value: Boolean) => {
    const itemIndex = listData?.findIndex(item => item.id === id) || 0;
    const newList = listData?.map((item, index) => {
      if (index === itemIndex) {
        return {
          __typename: item.__typename,
          id: item.id,
          name: item.name,
          isDone: value,
        } as Product
      }

      return item;
    });

    setListData(newList)
  }

  const handleEditItem = (id: string, value?: String) => {
    const itemIndex = listData?.findIndex(item => item.id === id) || 0;
    const newList = listData?.map((item, index) => {
      if (index === itemIndex) {
        return {
          __typename: item.__typename,
          id: item.id,
          name: value,
          isDone: item.isDone,
        } as Product
      }

      return item;
    });

    setListData(newList);
    updateProductListM({
      fetchPolicy: 'no-cache',
      variables: { newList },
    });
  }

  const throwError = () => {
    throw new Error('lol error')
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && !listData?.length && (
        <p>No data found</p>
      )}
      {!loading && !!listData?.length && (
        <ul ref={listRef} className={style.productList}>
          <DragDropContext onDragEnd={onDragEd}>
            <Droppable droppableId="productList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} >
                  <div className={style.placeholder}>
                    {provided.placeholder}
                  </div>
                  {listData?.map(({ id, name, isDone }: Product, index: number) => (
                    <ProductItem
                      index={index}
                      key={id}
                      id={id}
                      name={name}
                      isCompleted={isDone!}
                      onChange={handleDeleteItem}
                      onProductEdit={handleEditItem}
                      onComplete={handleCompleteItem}
                    />
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ul>
      )}
      <Button isPrimary onClick={throwError}>Catch</Button>
      <ErrorHandler error={error || updateProductListMData.error} />
      <ProductAddForm onChange={updateList} />
      <ProductListButtons onChange={refetch} />
      <span ref={anchorRef} />
    </>
  );
};

export default ProductList;
