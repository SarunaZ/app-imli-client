import ProductAddForm from "./ProductAddForm";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS_LIST_ORDER_UPDATE_MUTATION } from "Schema/mutations/productMutations";
import { PRODUCT_LIST_DATA } from "Schema/queries/productQueries";
import ProductListButtons from "./ProductListButtons";
import { ProductListData } from "./types";
import { Product } from "Schema/types";
import useQuery from "Hooks/useQuery";
import useMutation from "Hooks/useMutation";
import ProductList from "./ProductList";

interface State {
  listData?: ProductListData;
}

const ProductListWrapper = () => {
  const deleteRef = useRef<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<State>({
    listData: undefined,
  });

  const { loading, error, refetch } = useQuery(PRODUCT_LIST_DATA, {
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
  }, [state.listData?.length]);

  const saveOnChange = (newList: ProductListData) => {
    setState({ listData: [...newList] });

    const filteredList = [...newList].map((item) => ({
      id: item.id,
      name: item.name,
      isDone: item.isDone,
    }));

    updateProductListM({
      variables: { newList: structuredClone(filteredList) },
    });
  };

  const updateList = (newList?: Product) => {
    if (newList) {
      setState((prevState) => ({
        listData: [...prevState.listData, newList],
      }));
    }
  };

  const handleDeleteItem = (id: string) => {
    const newList = state.listData?.filter((item) => item.id !== id);
    setState({ listData: [...newList] });

    deleteRef.current = true;
  };

  return (
    <>
      <ProductList
        loading={loading}
        onChange={saveOnChange}
        listData={state.listData}
        onDelete={handleDeleteItem}
        error={error || updateProductListMData.error}
      />
      <ProductAddForm onChange={updateList} />
      <ProductListButtons onChange={refetch} />
    </>
  );
};

export default ProductListWrapper;
