import React from "react";
import { Helmet } from "react-helmet-async";
import MealList from "./MealList";
import style from "./style.scss";

const ProductListView = () => {
  return (
    <>
      <Helmet title={"Meal list | Imli"} />
      <section className={style.mealListWrapper}>
        <h2 className={style.mealListTitle}>Meal list</h2>
        <MealList />
      </section>
    </>
  );
};

export default ProductListView;
