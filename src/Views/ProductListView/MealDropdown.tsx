import { SyntheticEvent } from 'react';
import { IngredientsInput } from 'Views/MealView/types';
import Loader from 'Components/Loader';
import style from './style.module.scss';
import { useMutation } from '@apollo/client';
import { MEAL_ATTACH_TO_PRODUCT_MUTATION } from 'Schema/mutations';

interface Props {
  isLoading?: boolean;
  onChange: () => void;
  data?: {
    id: string;
    name: string;
    ingredients: IngredientsInput[];
  }[];
}

const MealDropdown = ({ isLoading, data, onChange }: Props) => {
    const [attachMealToProductM, attachMealToProductMData] =
    useMutation(MEAL_ATTACH_TO_PRODUCT_MUTATION);

  if (isLoading) {
    return <Loader/>
  }

  if (!isLoading && !data?.length) {
    return <p>No meals found</p>;
  }

  const handleOnChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const mealId = event.currentTarget.value;
    const ingredientList = data?.find(meal => meal.id === mealId)?.ingredients;
    const normalizeData = ingredientList?.map(item => {
      return {
        name: item.name
      };
    });

    attachMealToProductM({
      variables: {
        ingredients: normalizeData
      }
    })
    .then(onChange);
  };

  return (
    <select
      className={style.productListDropdown}
      onChange={handleOnChange}
      defaultValue=""
    >
      <option value="" disabled>Choose your meal</option>
      {data?.map(meal => (
        <option value={meal?.id} key={meal.id}>
          {meal.name}
        </option>
      ))}
    </select>
  );
};

export default MealDropdown;
