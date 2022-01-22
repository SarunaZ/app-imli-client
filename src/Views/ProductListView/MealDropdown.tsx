import { SyntheticEvent } from 'react';
import { IngredientsInput } from 'Views/MealView/types';
import Loader from 'Components/Loader';
import style from './style.module.scss';

interface Props {
  isLoading?: boolean;
  onChange: (ingredients: IngredientsInput[] | undefined) => void;
  data?: {
    id: string;
    name: string;
    ingredients: IngredientsInput[];
  }[];
}

const ProductList = ({ isLoading, data, onChange }: Props) => {
  if (isLoading) {
    return <Loader/>;
  }

  if (!isLoading && !data?.length) {
    return <p>No meals found</p>;
  }

  const handleMealChange = (data?: IngredientsInput[]) => {
    const normalizeData = data?.map(item => {
      return {
        name: item.name
      };
    });

    attachMealToProductM({
      variables: {
        ingredients: normalizeData
      }
    })
      .then(() => refetch());
  };

  const handleOnChage = (event: SyntheticEvent<HTMLSelectElement>) => {
    const mealId = event.currentTarget.value;
    const ingredientList = data?.find(meal => meal.id === mealId)?.ingredients;

    if (ingredientList) {
      onChange(ingredientList);
    }
  };

  return (
    <select
      className={style.productListDropdown}
      onChange={handleOnChage}
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

export default ProductList;
