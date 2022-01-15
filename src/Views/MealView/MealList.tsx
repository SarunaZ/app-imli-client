import React from 'react';
import Loader from "../../Components/Loader";
import {useMutation} from "@apollo/client";
import {MEAL_DELETE, PRODUCT_DELETE} from "../../Schema/mutations";

interface Props {
  isLoading: boolean;
  onDelete: () => void;
  data?: {
    id: string;
    name: string;
    ingredients: {
      name: string
    }[]
  }[];
}

const MealList = ({ isLoading, data, onDelete }: Props) => {
  const [deleteProductM, deleteProductData] = useMutation(MEAL_DELETE);

  if (isLoading) {
    return <Loader/>
  }

  if (!isLoading && !data?.length) {
    return <p>No data found</p>;
  }

  const deleteProduct = (id: string) => {
    deleteProductM({
      variables: {
        id
      }
    })
      .then(() => onDelete());
    }


  return (
    <ul>
      {data?.map(meal => (
        <React.Fragment key={meal.id}>
          <li>{meal.name}</li>
          {meal?.ingredients.map(ingredient => (
            <ol key={ingredient.name}>{ingredient.name}</ol>
          ))}
          <button type="button" onClick={() => deleteProduct(meal.id)}>X</button>
        </React.Fragment>
      ))}
    </ul>

  )

};

export default MealList;
