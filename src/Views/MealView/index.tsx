import { Helmet } from "react-helmet-async";
import style from "./style.scss";
import { MEAL_LIST_DATA } from "Schema/queries/meal.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import ExportToCsv from "./ExportToCsv";
import useQuery from "Hooks/useQuery";
import Add from "Images/icons/add.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_MEAL_CREATE_PAGE } from "App/constants";
import MealListItem from "Views/MealView/MealListItem";

const MealListView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(MEAL_LIST_DATA, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const isMealCreate = location.pathname.includes("/meal/create");
  const isMealEdit = location.pathname.includes("meal/edit");

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  const handleAddMeal = () => {
    navigate(ROUTE_MEAL_CREATE_PAGE);
  };

  const handleOnEdit = (mealId: string) => {
    navigate(`edit/${mealId}`);
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
          <ul className={style.mealList}>
            {data.meals?.map((meal) => (
              <MealListItem
                data={meal}
                key={meal.id}
                onDelete={refetch}
                onEdit={handleOnEdit}
              />
            ))}
          </ul>
          <button className={style.mealListAddButton} onClick={handleAddMeal}>
            <Add className={style.mealListAddIcon} />
          </button>
        </section>
      )}
    </>
  );
};

export default MealListView;
