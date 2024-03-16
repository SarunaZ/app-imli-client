import withModal, { ModalProps } from "HOC/withModal";
import { ElementRef, SyntheticEvent, useRef } from "react";
import IngredientContainer from "./IngredientContainer";
import { IngredientsInput } from "./types";
import style from "./style.scss";
import Input from "Components/Input";
import { MEAL_NAME_MUTATION } from "Schema/mutations/meal.mutations";
import useState from "Hooks/useState";
import useMutation from "Hooks/useMutation";

interface Props extends ModalProps {
  onChange: () => void;
}

interface State {
  addSuccessful: boolean;
}

const AddMealModal = ({ onChange }: Props) => {
  const [state, setState] = useState<State>({
    addSuccessful: false,
  });
  const mealInputRef = useRef<ElementRef<"input">>(null);
  const ingredientInputRef = useRef<IngredientsInput[]>();
  const [addMeal, mealData] = useMutation(MEAL_NAME_MUTATION);

  const setInputData = (data: IngredientsInput[]) => {
    ingredientInputRef.current = data;
  };

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(ingredientInputRef.current);
    // addMealQ({
    //   variables: {
    //     name: mealInputRef.current?.value,
    //     ingredients: ingredientInputRef.current,
    //   },
    //   update: () => {
    //     onChange();
    //     setState({ addSuccessful: true });
    //   },
    // });
  };

  if (state.addSuccessful) {
    return (
      <div>
        <p>Meal has been succesfully added!</p>
      </div>
    );
  }

  return (
    <form className={style.addMealModalWrapper} onSubmit={submitProduct}>
      <Input required ref={mealInputRef} label="Meal name" name="productName" />
      <IngredientContainer
        error={mealData?.error}
        isLoading={mealData.loading}
        onInput={setInputData}
      />
    </form>
  );
};

export default withModal(AddMealModal);
