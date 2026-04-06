import { Helmet } from "react-helmet-async";
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
  const isMealForm = isMealCreate || isMealEdit;

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      <Helmet title={"Meal list | Imli"} />
      {!isMealForm && (
        <section className="mx-auto max-w-6xl text-text">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-text">Meal list</h2>
            <ExportToCsv mealData={data?.meals} />
          </div>

          {!loading && (!data?.meals || !data?.meals?.length) && (
            <p className="text-text-muted">No data found</p>
          )}

          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 md:grid-cols-3">
            {data.meals?.map((meal) => (
              <MealListItem
                data={meal}
                key={meal.id}
                onDelete={refetch}
                onEdit={(mealId) => navigate(`edit/${mealId}`)}
              />
            ))}
          </ul>

          <button
            className="fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg transition-transform hover:scale-110 md:bottom-12 md:right-12"
            onClick={() => navigate(ROUTE_MEAL_CREATE_PAGE)}
          >
            <Add className="h-7 w-7 text-text-inv" />
          </button>
        </section>
      )}
    </>
  );
};

export default MealListView;
