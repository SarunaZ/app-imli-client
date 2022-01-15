import Loader from "Components/Loader";
import {useMutation} from "@apollo/client";
import {PRODUCTS_LIST_ORDER_UPDATE_MUTATION, PRODUCT_DELETE} from "Schema/mutations";
import ProductItem from "./ProductItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { Product } from "Schema/types";
import style from './style.module.scss';

interface Props {
  isLoading: boolean;
  onDelete: () => void;
  onReorder: (newList: Product[]) => void;
  data?: Product[];
}

const ProductList = ({ isLoading, data, onDelete, onReorder }: Props) => {
  const [deleteProductM, deleteProductData] = useMutation(PRODUCT_DELETE);
  const [updateProductListM, updateProductListMData] = 
    useMutation(PRODUCTS_LIST_ORDER_UPDATE_MUTATION);

  if (isLoading) {
    return <Loader/>
  }

  if (!isLoading && !data?.length) {
    return <p>No data found</p>;
  }

  const deleteProduct = (id: string) => {
    deleteProductM({
      variables: {
        id
      }
    })
      .then(() => onDelete());
    }

  const onDragEd = (result: DropResult) => {
    const { source, destination } = result;
    const items = data && Array.from(data);

    if (items && destination) {
      const [ newOrder ] = items.splice(source.index, 1);
      items?.splice(destination.index, 0, newOrder);

      const newList = items.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })

      updateProductListM({
        variables: { newList },
        update: () => onReorder(items)
      })
    }
  }

  return (
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
  )

};

export default ProductList;
