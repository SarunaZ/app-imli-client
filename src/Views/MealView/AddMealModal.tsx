import { useMutation } from "@apollo/client";
import withModal, { ModalProps } from "HOC/withModal";
import { SyntheticEvent, useRef, useState } from "react";
import { MEAL_NAME_MUTATION } from "Schema/mutations";
import IngredientContainer from "./IngredientContainer";
import { IngredientsInput } from "./types";
import style from './style.module.scss';
import Input from "Components/Input";
import ErrorHandler from "Components/ErrorHandler";

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
      <Input 
        required
        ref={mealInputRef}
        label="Meal name"
        name="productName"
      />
      <ErrorHandler error={addMealQData.error} />
      <IngredientContainer 
        isLoading={addMealQData.loading} 
        inputData={setInputData}
      />
    </form>
  )
}

export default withModal(AddMealModal);