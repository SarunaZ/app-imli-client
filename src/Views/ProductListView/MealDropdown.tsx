import { SyntheticEvent } from "react";
import Loader from "Components/Loader";
import style from "./style.scss";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { MEAL_ATTACH_TO_PRODUCT_MUTATION } from "Schema/mutations/product.mutations";
import withModal from "HOC/withModal";
import { MEAL_LIST_DATA } from "Schema/queries/product.queries";
import { MealDropDownListQuery } from "Schema/types";
import ErrorHandler from "Components/ErrorHandler";
import useMutation from "Hooks/useMutation";

type Meals = MealDropDownListQuery["meals"];
interface Props {
  onUpdate: () => void;
}

const MealDropdown = ({ onUpdate }: Props) => {
  const { loading, error, data } = useQuery(MEAL_LIST_DATA);
  const [attachMealToProductM] = useMutation(MEAL_ATTACH_TO_PRODUCT_MUTATION);

  if (loading) {
    return <Loader />;
  }

  if (error) return <ErrorHandler error={error} />;

  if (!loading && !data.meals?.length) {
    return <p>No meals found</p>;
  }

  const mealData = data.meals as Meals;

  const handleOnChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const mealId = event.currentTarget.value;
    const ingredientList = mealData?.find((meal) => meal.id === mealId)
      ?.ingredients;
    const normalizeData = ingredientList?.map((item) => {
      return {
        name: item?.name,
      };
    });

    attachMealToProductM({
      variables: {
        ingredients: normalizeData,
      },
      update: () => {
        onUpdate();
      },
    });
  };

  return (
    <select
      className={style.productListDropdown}
      onChange={handleOnChange}
      defaultValue={null}
    >
      <option value={null} disabled selected>
        Choose your meal
      </option>
      {mealData?.map((meal) => (
        <option value={meal?.id} key={meal.id}>
          {meal.name}
        </option>
      ))}
    </select>
  );
};

export default withModal(MealDropdown);
