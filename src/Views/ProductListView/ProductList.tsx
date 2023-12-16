import React from "react";
import Loader from "Components/Loader";
import { useMutation } from "@apollo/client";
import ProductItem from "./ProductItem";
import style from "./style.scss";
import ProductAddForm from "./ProductAddForm";
import { useEffect, useRef } from "react";
import ErrorHandler from "Components/ErrorHandler";
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from "Schema/mutations/productMutations";
import { PRODUCT_LIST_DATA } from "Schema/queries/productQueries";
import ProductListButtons from "./ProductListButtons";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
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
import useState from "Hooks/useState";
import { ProductListData } from "./types";
import { Product } from "Schema/types";

interface State {
  listData?: ProductListData;
}

const ProductList = () => {
  const deleteRef = useRef<boolean>(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<State>({
    listData: undefined,
  });

  const { loading, error, refetch } = useQuery(PRODUCT_LIST_DATA, {
    errorPolicy: "all",
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setState({
        listData: res.products?.map((item: Product) => ({
          id: item.id,
          name: item.name,
          isDone: item.isDone,
        })),
      });
    },
  });

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
  }, [state.listData?.length]);

  const saveOnChange = (newList: ProductListData) => {
    setState({ listData: newList });

    updateProductListM({
      fetchPolicy: "no-cache",
      variables: { newList },
    });
  };

  const onDragEd = (event: DragEndEvent) => {
    const { active, over } = event;
    const items = state.listData;
    const oldIndex = items.findIndex((object) => object.id === active.id);
    const newIndex = items.findIndex((object) => object.id === over.id);
    const newList = arrayMove(normalizedList(), oldIndex, newIndex);

    function normalizedList() {
      return items.map((item) => ({
        id: item.id,
        name: item.name,
        isDone: item.isDone,
      }));
    }

    saveOnChange(newList);
  };

  const updateList = (newList?: ProductListData) => {
    if (newList) {
      setState((prevState) => ({
        listData: [...prevState.listData, ...newList],
      }));
      return;
    }
  };

  const handleDeleteItem = (id: string) => {
    const newList = state.listData?.filter((item) => item.id !== id);
    setState({ listData: newList as ProductListData });
    deleteRef.current = true;
  };

  const handleCompleteItem = (id: string, value: boolean) => {
    const itemIndex = state.listData?.findIndex((item) => item.id === id) || 0;

    const newList = state.listData?.map((item, index) => {
      if (index === itemIndex) {
        return {
          id: item.id,
          name: item.name,
          isDone: value,
        };
      }

      return item;
    });

    saveOnChange(newList);
  };

  const handleEditItem = (id: string, value?: string) => {
    const itemIndex = state.listData?.findIndex((item) => item.id === id) || 0;
    const newList = state.listData?.map((item, index) => {
      if (index === itemIndex) {
        return {
          id: item.id,
          name: value,
          isDone: item.isDone,
        };
      }

      return item;
    });

    saveOnChange(newList);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && !state.listData?.length && <p>No data found</p>}
      {!loading && !!state.listData?.length && (
        <ul ref={listRef} className={style.productList}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEd}
          >
            <SortableContext
              items={state.listData}
              strategy={verticalListSortingStrategy}
            >
              {state.listData?.map(({ id, name, isDone }, index: number) => (
                <ProductItem
                  index={index}
                  key={id}
                  id={id}
                  name={name}
                  isCompleted={isDone}
                  onChange={handleDeleteItem}
                  onProductEdit={handleEditItem}
                  onComplete={handleCompleteItem}
                />
              ))}
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
