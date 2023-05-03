import React from "react";
import { Helmet } from "react-helmet-async";
import ProductList from "./ProductList";
import style from "./style.scss";

const ProductListView = () => (
  <>
    <Helmet title={"Product list | Imli"} />
    <section className={style.productListWrapper}>
      <h2 className={style.productListTitle}>Product list</h2>
      <ProductList />
    </section>
  </>
);

export default ProductListView;
