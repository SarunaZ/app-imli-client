import React from "react";
import { Helmet } from "react-helmet-async";
import MealList from "./MealList";
import style from "./style.scss";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { MEAL_LIST_DATA } from "Schema/queries/mealQueries";
import { DeepExtractType } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import ExportToCsv from "./ExportToCsv";

interface Meals {
  meals?: DeepExtractType<MealListQuery, ["meals"]>;
}

const MealListView = () => {
  const { loading, error, data, refetch } = useQuery<Meals>(MEAL_LIST_DATA, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      <Helmet title={"Meal list | Imli"} />
      <section className={style.mealListWrapper}>
        <div className={style.mealListHeader}>
          <h2 className={style.mealListTitle}>Meal list</h2>
          <ExportToCsv mealData={data?.meals} />
        </div>
        {!loading && (!data?.meals || !data?.meals?.length) && (
          <p>No data found</p>
        )}
        <MealList mealData={data.meals} onChange={refetch} />
      </section>
    </>
  );
};

export default MealListView;
