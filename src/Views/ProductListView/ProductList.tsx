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
import { ApolloError } from "@apollo/client";

interface Props {
  listData?: ProductListData;
  loading: boolean;
  error: ApolloError;
  onChange: (newList: ProductListData) => void;
  onDelete: (id: string) => void;
}

const ProductList = ({
  listData,
  loading,
  error,
  onChange,
  onDelete,
}: Props) => {
  const deleteRef = useRef<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);

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

    onChange(newList);
  };
  console.log(listData, "list");

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

    onChange(newList);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && !listData?.length && <p>No data found</p>}
      {!loading && !!listData?.length && (
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
      )}
      <ErrorHandler error={error} />
    </>
  );
};

export default ProductList;
