import Loader from 'Components/Loader';
import { useMutation, useQuery } from '@apollo/client';
import { MEAL_ATTACH_TO_PRODUCT_MUTATION, PRODUCTS_LIST_ORDER_UPDATE_MUTATION, PRODUCT_DELETE, PRODUCT_NAME_MUTATION } from 'Schema/mutations';
import ProductItem from './ProductItem';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Product } from 'Schema/types';
import style from './style.module.scss';
import { SyntheticEvent, useRef } from 'react';
import { PRODUCT_LIST_DATA } from 'Schema/queries';
import { IngredientsInput } from 'Views/MealView/types';

const ProductList = () => {
  const { loading, data, refetch } = useQuery(PRODUCT_LIST_DATA);
  const [deleteProductM, deleteProductData] = useMutation(PRODUCT_DELETE);
  const [updateProductListM, updateProductListMData] =
    useMutation(PRODUCTS_LIST_ORDER_UPDATE_MUTATION);
  const productInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [addProductQ, productQData] = useMutation(PRODUCT_NAME_MUTATION);
  const [attachMealToProductM, attachMealToProductMData] =
    useMutation(MEAL_ATTACH_TO_PRODUCT_MUTATION);

  if (loading) {
    return <Loader/>;
  }

  if (!loading && !data?.length) {
    return <p>No data found</p>;
  }

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addProductQ({
      variables: {
        name: productInputRef.current?.value
      }
    })
      .then(() => {
        formRef.current?.reset();
        refetch();
      });
  };

  const handleMealChange = (data?: IngredientsInput[]) => {
    const normalizeData = data?.map(item => {
      return {
        name: item.name
      };
    });

    attachMealToProductM({
      variables: {
        ingredients: normalizeData
      }
    })
      .then(() => refetch());
  };

  const deleteProduct = (id: string) => {
    deleteProductM({
      variables: {
        id
      }
    })
      .then(() => onDelete());
  };

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
        update: () => onReorder(items)
      });
    }
  };

  return (
    <>
        <ul className={style.productList}>
      <DragDropContext onDragEnd={onDragEd}>
        <Droppable droppableId="productList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} >
              <div className={style.placeholder}>
                {provided.placeholder}
              </div>
              {data?.map((product, index) => (
                <ProductItem
                  index={index}
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  onDelete={deleteProduct}
                />
              ))}
            </div>
          )}
      </Droppable>
    </DragDropContext>
      </ul>
            <form
          ref={formRef}
          onSubmit={submitProduct}
          className={style.inputForm}
        >
          <label
            className={style.formLabel}
            htmlFor="productName"
            >
              Product
            </label>
          <input
            required
            className={style.formInput}
            ref={productInputRef}
            name="productName"
            type="text"
          />
          <Button
            type="submit"
            isLoading={productQData.loading}
          >
            <span>Add</span>
          </Button>
        </form>
    </>
  );
};

export default ProductList;
