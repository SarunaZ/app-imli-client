import { SyntheticEvent, useRef } from 'react';
import Loader from 'Components/Loader';
import { useMutation, useQuery } from '@apollo/client';
import { MEAL_NAME_MUTATION } from 'Schema/mutations';
import style from './style.module.scss';
import { MEAL_LIST_DATA } from 'Schema/queries';
import MealListItem from './MealListItem';
import IngredientField from './IngredientField';
import { IngredientsInput } from './types';

interface Meal {
  id: string;
  name: string;
  ingredients: {
    name: string
  }[]
}

const MealList = () => {
  const { loading, error, data, refetch } = useQuery(MEAL_LIST_DATA);
  const mealInputRef = useRef<HTMLInputElement>(null);
  const ingredientInputRef = useRef<IngredientsInput[]>();
  const [addMealQ, addMealQData] = useMutation(MEAL_NAME_MUTATION);

  if (loading) {
    return <Loader/>;
  }

  if (!loading && !data?.length) {
    return <p>No data found</p>;
  }

  const setInputData = (data: IngredientsInput[]) => {
    ingredientInputRef.current = data;
  };

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMealQ({
      variables: {
        name: mealInputRef.current?.value,
        ingredients: ingredientInputRef.current
      }
    })
      .then(() => refetch());
  };

  return (
    <>
      <ul className={style.mealList}>
        {data?.map((meal: Meal) => <MealListItem data={meal} onDelete={refetch} />)}
      </ul>
      <form onSubmit={submitProduct}>
        <label htmlFor="mealName">Meal name</label>
        <input ref={mealInputRef} name="productName" type="text"/>
        <IngredientField inputData={setInputData} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MealList;
