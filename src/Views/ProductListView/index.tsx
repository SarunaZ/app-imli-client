import ProductAddForm from "./ProductAddForm";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_LIST_DATA } from "Schema/queries/product.queries";
import ProductListButtons from "./ProductListButtons";
import { ProductListData } from "./types";
import { Product } from "Schema/types";
import ProductList from "./ProductList";
import ErrorHandler from "Components/ErrorHandler";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@apollo/client/react";

interface State {
  listData?: ProductListData;
}

const Index = () => {
  const deleteRef = useRef<boolean>(false);
  const [state, setState] = useState<State>({ listData: undefined });

  const { loading, error, data, refetch } = useQuery(PRODUCT_LIST_DATA, {
    // cache-first so the client's first render reads the SSR-restored cache
    // (matches the server output). `network-only` would refetch on mount and
    // break hydration. Freshness still comes via the refetch button.
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    if (data?.products) {
      setState({
        listData: data.products.map((item) => ({
          id: item.id,
          name: item.name,
          isDone: item.isDone,
        })),
      });
    }
  }, [data]);

  // Render from local (drag-reorderable) state once it's seeded, otherwise fall
  // back to the query data. The fallback is what lets the products appear in the
  // SSR HTML (and the first client render), since `useEffect` doesn't run on the
  // server. After hydration the effect seeds `state.listData` for local edits.
  const resolvedList =
    state.listData ??
    data?.products?.map((item) => ({
      id: item.id,
      name: item.name,
      isDone: item.isDone,
    }));

  const saveOnChange = (newList: ProductListData) => {
    setState({ listData: [...newList] });
  };

  const updateList = (newList?: Product) => {
    if (newList) {
      setState((prev) => ({
        listData: [...prev.listData, newList],
      }));
    }
  };

  const handleDeleteItem = (id: string) => {
    const newList = state.listData?.filter((item) => item.id !== id);
    setState({ listData: [...newList] });
    deleteRef.current = true;
  };

  const handleProductRename = (id: string, value: string) => {
    const newList = state.listData?.map((item) => {
      if (item.id === id) item.name = value;
      return item;
    });
    setState({ listData: [...newList] });
  };

  const handleProductComplete = (id: string, value: boolean) => {
    const newList = state.listData?.map((item) => {
      if (item.id === id) item.isDone = value;
      return item;
    });
    setState({ listData: [...newList] });
  };

  return (
    <>
      <Helmet title={"Product list | Imli"} />
      <section className="mx-auto flex h-[calc(100dvh-80px)] max-w-lg flex-col text-text md:h-[calc(100dvh-40px)]">
        <h2 className="mb-4 text-2xl font-bold text-text">Product list</h2>
        <div className="flex min-h-0 flex-1 flex-col">
          <ProductList
            loading={loading}
            onChange={saveOnChange}
            listData={resolvedList}
            onDelete={handleDeleteItem}
            onRename={handleProductRename}
            onCompleted={handleProductComplete}
          />
        </div>
        <ErrorHandler error={error} />
        <ProductAddForm onChange={updateList} />
        <ProductListButtons onChange={refetch} />
      </section>
    </>
  );
};

export default Index;
