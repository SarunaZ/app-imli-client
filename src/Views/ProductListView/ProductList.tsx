import Loader from "Components/Loader";
import ProductItem from "./ProductItem";
import style from "./style.scss";
import { ComponentProps, useEffect, useRef } from "react";
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
import { ProductError, ProductListData } from "./types";
import useMutation from "Hooks/useMutation";
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from "Schema/mutations/product.mutations";
import useState from "Hooks/useState";

interface Props {
  listData?: ProductListData;
  loading: boolean;
  onChange: (newList: ProductListData) => void;
  onRename: ComponentProps<typeof ProductItem>["onRename"];
  onDelete: ComponentProps<typeof ProductItem>["onDelete"];
  onCompleted: ComponentProps<typeof ProductItem>["onCompleted"];
}

interface State {
  error?: ProductError;
}

const ProductList = ({
  listData,
  loading,
  onChange,
  onDelete,
  onRename,
  onCompleted,
}: Props) => {
  const [state, setState] = useState<State>({
    error: undefined,
  });

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

  const handleOnError = (error: ProductError) => {
    setState({ error });
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
                onDelete={onDelete}
                onError={handleOnError}
                onRename={onRename}
                onCompleted={onCompleted}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
      <ErrorHandler error={updateProductListMData.error || state.error} />
    </>
  );
};

export default ProductList;
