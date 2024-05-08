import { Helmet } from "react-helmet-async";
import MealList from "./MealList";
import style from "./style.scss";
import { MEAL_LIST_DATA } from "Schema/queries/meal.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import ExportToCsv from "./ExportToCsv";
import useQuery from "Hooks/useQuery";
import Add from "Images/icons/add.svg";
import React from "react";
import useState from "Hooks/useState";
import MealForm from "Views/MealView/MealForm";
import { useParams } from "react-router-dom";

interface State {
  isCreate: boolean;
  isEdit?: string;
}

interface Params {
  id: string;
}

const MealListView = () => {
  const params = useParams<keyof Params>() as Params;

  const [state, setState] = useState<State>({
    isEdit: params.id,
    isCreate: false,
  });

  const { loading, error, data, refetch } = useQuery(MEAL_LIST_DATA, {
    notifyOnNetworkStatusChange: true,
  });

  console.log(params, "params");

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  const handleAddMeal = () => {
    setState({ isCreate: true });
  };

  const handleOnEdit = (mealId: string) => {
    setState({ isEdit: mealId });
  };

  return (
    <>
      <Helmet title={"Meal list | Imli"} />
      {!state.isCreate && !state.isEdit && (
        <section className={style.mealListWrapper}>
          <div className={style.mealListHeader}>
            <h2 className={style.mealListTitle}>Meal list</h2>
            <ExportToCsv mealData={data?.meals} />
          </div>
          {!loading && (!data?.meals || !data?.meals?.length) && (
            <p>No data found</p>
          )}
          <MealList
            onEdit={handleOnEdit}
            mealData={data.meals}
            onChange={refetch}
          />
          <button className={style.mealListAddButton} onClick={handleAddMeal}>
            <Add className={style.mealListAddIcon} />
          </button>
        </section>
      )}
      {!!state.isEdit && (
        <MealForm
          mealData={data.meals.find((item) => item.id === state.isEdit)}
        />
      )}
    </>
  );
};

export default MealListView;
