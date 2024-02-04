import ProductAddForm from "./ProductAddForm";
import { useRef, useState } from "react";
import { PRODUCT_LIST_DATA } from "Schema/queries/productQueries";
import ProductListButtons from "./ProductListButtons";
import { ProductListData } from "./types";
import { Product } from "Schema/types";
import useQuery from "Hooks/useQuery";
import ProductList from "./ProductList";
import ErrorHandler from "Components/ErrorHandler";

interface State {
  listData?: ProductListData;
}

const ProductListWrapper = () => {
  const deleteRef = useRef<boolean>(false);
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

  const saveOnChange = (newList: ProductListData) => {
    setState({ listData: [...newList] });
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
      />
      <ErrorHandler error={error} />
      <ProductAddForm onChange={updateList} />
      <ProductListButtons onChange={refetch} />
    </>
  );
};

export default ProductListWrapper;
