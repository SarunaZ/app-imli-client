import { Helmet } from 'react-helmet-async';
import {SyntheticEvent, useRef} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {MEAL_LIST} from "Schema/queries";
import {MEAL_NAME_MUTATION} from "Schema/mutations";
import MealList from "./MealList";
import IngredientField from "./IngredientField";
import {IngredientsInput} from "./types";

const ProductListView = () => {
  const mealInputRef = useRef<HTMLInputElement>(null);
  const ingredientInputRef = useRef<IngredientsInput[]>();
  const { loading, error, data, refetch } = useQuery(MEAL_LIST);
  const [addMealQ, addMealQData] = useMutation(MEAL_NAME_MUTATION);

  const setInputData = (data: IngredientsInput[]) => {
    console.log(data, 'data')
    ingredientInputRef.current = data
  }

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(ingredientInputRef.current)
    addMealQ({
      variables: {
        name: mealInputRef.current?.value,
        ingredients: ingredientInputRef.current
      },
    })
      .then(() => refetch());
  }

  return (
    <>
      <Helmet title={'Meal list | Imli'} />
      <section>
        <h2>Meal list</h2>
        <MealList onDelete={() => refetch()} data={data?.meals} isLoading={loading} />
        <form onSubmit={submitProduct}>
          <label htmlFor="mealName">Meal name</label>
          <input ref={mealInputRef} name="productName" type="text"/>
          <IngredientField inputData={setInputData} />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default ProductListView;