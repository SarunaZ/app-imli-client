import ProductAddForm from "./ProductAddForm";
import { useRef, useState } from "react";
import { PRODUCT_LIST_DATA } from "Schema/queries/product.queries";
import ProductListButtons from "./ProductListButtons";
import { ProductListData } from "./types";
import { Product } from "Schema/types";
import useQuery from "Hooks/useQuery";
import ProductList from "./ProductList";
import ErrorHandler from "Components/ErrorHandler";
import { Helmet } from "react-helmet-async";
import style from "Views/ProductListView/style.scss";

interface State {
  listData?: ProductListData;
}

const Index = () => {
  const deleteRef = useRef<boolean>(false);
  const [state, setState] = useState<State>({
    listData: undefined,
  });

  const { loading, error, refetch } = useQuery(PRODUCT_LIST_DATA, {
    fetchPolicy: "network-only",
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

  // This is perfectly fine even if the solution repeats itself with different variables
  // This is more maintainable and readable than having multiple if statements for different use cases
  // Not everything has to be strictly according to DRY
  const handleProductRename = (id: string, value: string) => {
    const newList = state.listData?.map((item) => {
      if (item.id === id) {
        item.name = value;
      }

      return item;
    });

    setState({ listData: [...newList] });
  };

  const handleProductComplete = (id: string, value: boolean) => {
    const newList = state.listData?.map((item) => {
      if (item.id === id) {
        item.isDone = value;
      }

      return item;
    });

    setState({ listData: [...newList] });
  };

  return (
    <>
      <Helmet title={"Product list | Imli"} />
      <section className={style.productListWrapper}>
        <h2 className={style.productListTitle}>Product list</h2>
        <ProductList
          loading={loading}
          onChange={saveOnChange}
          listData={state.listData}
          onDelete={handleDeleteItem}
          onRename={handleProductRename}
          onCompleted={handleProductComplete}
        />
        <ErrorHandler error={error} />
        <ProductAddForm onChange={updateList} />
        <ProductListButtons onChange={refetch} />
      </section>
    </>
  );
};

export default Index;
