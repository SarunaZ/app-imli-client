import React from "react";
import Loader from "Components/Loader";
import { useMutation } from "@apollo/client";
import ProductItem from "./ProductItem";
import { Product, ProductListQuery } from "Schema/types";
import style from "./style.scss";
import ProductAddForm from "./ProductAddForm";
import { useEffect, useRef, useState } from "react";
import ErrorHandler from "Components/ErrorHandler";
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from "Schema/mutations/productMutations";
import { useQuery } from "@apollo/client";
import { PRODUCT_LIST_DATA } from "Schema/queries/productQueries";
import ProductListButtons from "./ProductListButtons";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type ProductListData = ProductListQuery["products"];

const ProductList = () => {
  const deleteRef = useRef<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [listData, setListData] = useState<
    ProductListData | undefined
  >(undefined);

  const { loading, error, refetch } = useQuery(PRODUCT_LIST_DATA, {
    errorPolicy: "all",
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setListData(
        res.products?.map((item: any) => ({
          id: item.id,
          name: item.name,
          isDone: item.isDone,
        })),
      );
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [updateProductListM, updateProductListMData] = useMutation(
    PRODUCTS_LIST_ORDER_UPDATE_MUTATION,
    { errorPolicy: "all" },
  );

  const scrollToListBottom = () => {
    if (!deleteRef.current) {
      listRef.current?.scroll({
        top: listRef?.current?.scrollHeight,
        behavior: "smooth",
      });

      anchorRef.current?.scrollIntoView({
        block: "end",
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
    const items = listData && Array.from(listData);
    const oldIndex = items.findIndex(
      (object) => object.id === active.id,
    );
    const newIndex = items.findIndex(
      (object) => object.id === over.id,
    );
    const newList = arrayMove(normalizedList(), oldIndex, newIndex);

    function normalizedList() {
      return items.map((item) => ({
        id: item.id,
        name: item.name,
        isDone: item.isDone,
      }));
    }

    setListData(newList);
    updateProductListM({
      fetchPolicy: "no-cache",
      variables: { newList },
    });
  };

  const updateList = (newList?: Product[]) => {
    if (newList) {
      setListData((prev) => [...(prev || []), ...newList]);
      return;
    }
  };

  const handleDeleteItem = (id: string) => {
    const newList = listData?.filter((item) => item.id !== id);
    setListData(newList);
    deleteRef.current = true;
  };

  const handleCompleteItem = (id: string, value: boolean) => {
    const itemIndex =
      listData?.findIndex((item) => item.id === id) || 0;

    const newList = listData?.map((item, index) => {
      if (index === itemIndex) {
        return {
          __typename: item.__typename,
          id: item.id,
          name: item.name,
          isDone: value,
        } as Product;
      }

      return item;
    });

    setListData(newList);
  };

  const handleEditItem = (id: string, value?: string) => {
    const itemIndex =
      listData?.findIndex((item) => item.id === id) || 0;
    const newList = listData?.map((item, index) => {
      if (index === itemIndex) {
        return {
          __typename: item.__typename,
          id: item.id,
          name: value,
          isDone: item.isDone,
        } as Product;
      }

      return item;
    });

    setListData(newList);
    updateProductListM({
      fetchPolicy: "no-cache",
      variables: { newList },
    });
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
              {listData?.map(
                ({ id, name, isDone }: Product, index: number) => (
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
                ),
              )}
            </SortableContext>
          </DndContext>
        </ul>
      )}
      <ErrorHandler error={error || updateProductListMData.error} />
      <ProductAddForm onChange={updateList} />
      <ProductListButtons onChange={refetch} />
      <span ref={anchorRef} />
    </>
  );
};

export default ProductList;
