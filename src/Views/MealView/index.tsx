import { Helmet } from "react-helmet-async";
import MealList from "./MealList";
import style from "./style.scss";
import { MEAL_LIST_DATA } from "Schema/queries/meal.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import ExportToCsv from "./ExportToCsv";
import useQuery from "Hooks/useQuery";
import Add from "Images/icons/add.svg";
import React, { useEffect } from "react";
import useState from "Hooks/useState";
import MealForm from "Views/MealView/MealForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTE_MEAL_CREATE_PAGE } from "App/constants";

interface State {
  isCreate: boolean;
  isEdit?: string;
}

interface Params {
  id: string;
}

const MealListView = () => {
  const params = useParams<keyof Params>() as Params;
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    isEdit: params.id,
    isCreate: location.pathname === "/meal/create",
  });
  console.log(state);
  const { loading, error, data, refetch } = useQuery(MEAL_LIST_DATA, {
    notifyOnNetworkStatusChange: true,
  });

  const isMealCreate = location.pathname.includes("/meal/create");
  const isMealEdit = location.pathname.includes("meal/edit");
  console.log(params, "params");

  useEffect(() => {}, [location.pathname]);

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  const handleAddMeal = () => {
    navigate(ROUTE_MEAL_CREATE_PAGE);
  };

  const handleOnEdit = (mealId: string) => {
    setState({ isEdit: mealId });
  };

  const isMealForm = isMealCreate || isMealEdit;

  return (
    <>
      <Helmet title={"Meal list | Imli"} />
      {!isMealForm && (
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
      {isMealCreate && (
        <MealForm
          onChange={() => {}}
          mealData={data.meals.find((item) => item.id === state.isEdit)}
        />
      )}
      {isMealEdit && <MealForm onChange={() => {}} />}
    </>
  );
};

export default MealListView;
