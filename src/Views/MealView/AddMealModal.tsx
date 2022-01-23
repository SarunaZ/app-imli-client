import { useMutation } from "@apollo/client";
import Button from "Components/Button";
import withModal, { ModalProps } from "HOC/withModal";
import { SyntheticEvent, useRef, useState } from "react";
import { MEAL_NAME_MUTATION } from "Schema/mutations";
import IngredientField from "./IngredientField";
import { IngredientsInput } from "./types";
import style from './style.module.scss';

interface Props extends ModalProps {
  onChange: () => void;
 };

const AddMealModal = ({ onChange }: Props) => {
  const [addSuccessful, setAddSuccessful] = useState<boolean>(false);
  const mealInputRef = useRef<HTMLInputElement>(null);
  const ingredientInputRef = useRef<IngredientsInput[]>();
  const [addMealQ, addMealQData] = useMutation(MEAL_NAME_MUTATION);
  
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
    .then(() => {
      onChange();
      setAddSuccessful(true);
    });
  };

  if (addSuccessful) {
    return (
      <div>
        <p>Meal has been succesfully added!</p>
      </div>
    )
  }

  return (
    <form className={style.addMealModalWrapper} onSubmit={submitProduct}>
      <label htmlFor="mealName">Meal name</label>
      <input 
        required
        ref={mealInputRef}
        name="productName"
        type="text"
      />
      <IngredientField inputData={setInputData} />
      <Button type="submit" isLoading={addMealQData.loading}>Submit</Button>
    </form>
  )
}

export default withModal(AddMealModal);