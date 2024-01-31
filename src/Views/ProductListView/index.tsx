import React from "react";
import { Helmet } from "react-helmet-async";
import ProductListWrapper from "./ProductListWrapper";
import style from "./style.scss";

const ProductListView = () => (
  <>
    <Helmet title={"Product list | Imli"} />
    <section className={style.productListWrapper}>
      <h2 className={style.productListTitle}>Product list</h2>
      <ProductListWrapper />
    </section>
  </>
);

export default ProductListView;
