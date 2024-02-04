import Loader from "Components/Loader";
import ProductItem from "./ProductItem";
import style from "./style.scss";
import { useEffect, useRef } from "react";
import ErrorHandler from "Components/ErrorHandler";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ProductListData } from "./types";
import useMutation from "Hooks/useMutation";
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from "Schema/mutations/productMutations";

interface Props {
  listData?: ProductListData;
  loading: boolean;
  onChange: (newList: ProductListData) => void;
  onDelete: (id: string) => void;
}

const ProductList = ({ listData, loading, onChange, onDelete }: Props) => {
  const deleteRef = useRef<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);

  const [updateProductListM, updateProductListMData] = useMutation(
    PRODUCTS_LIST_ORDER_UPDATE_MUTATION,
  );

  const scrollToListBottom = () => {
    if (!deleteRef.current) {
      listRef.current?.scroll({
        top: listRef?.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToListBottom();

    deleteRef.current = false;
  }, [listData?.length]);

  const saveOnChange = (newList: ProductListData) => {
    onChange(newList);

    const filteredList = [...newList].map((item) => ({
      id: item.id,
      name: item.name,
      isDone: item.isDone,
    }));

    updateProductListM({
      variables: { newList: structuredClone(filteredList) },
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 155,
        tolerance: 15,
      },
    }),
  );

  const onDragEd = (event: DragEndEvent) => {
    const { active, over } = event;

    const oldIndex = listData.findIndex((object) => object.id === active.id);
    const newIndex = listData.findIndex((object) => object.id === over.id);

    const normalizedList = () => {
      return listData.map((item) => ({
        id: item.id,
        name: item.name,
        isDone: item.isDone,
      }));
    };

    const newList = arrayMove(normalizedList(), oldIndex, newIndex);

    saveOnChange(newList);
  };

  const handleItemChange = (id: string, value?: boolean | string) => {
    const itemIndex = listData?.findIndex((item) => item.id === id) || 0;

    const newList = listData?.map((item, index) => {
      const changeValueName = typeof value === "string" ? value : item.name;
      const changeValueIsDone =
        typeof value === "boolean" ? value : item.isDone;

      if (index === itemIndex) {
        return {
          id: item.id,
          name: changeValueName,
          isDone: changeValueIsDone,
        };
      }

      return item;
    });

    saveOnChange(newList);
  };

  if (loading) return <Loader />;
  if (!listData?.length) return <p>No data found</p>;

  return (
    <>
      <ul ref={listRef} className={style.productList}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEd}
        >
          <SortableContext
            items={listData}
            strategy={verticalListSortingStrategy}
          >
            {listData?.map(({ id, name, isDone }) => (
              <ProductItem
                key={id}
                id={id}
                name={name}
                isCompleted={isDone}
                onChange={handleItemChange}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
      <ErrorHandler error={updateProductListMData.error} />
    </>
  );
};

export default ProductList;
