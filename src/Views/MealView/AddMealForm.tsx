import { ElementRef, SyntheticEvent, useRef } from "react";
import IngredientContainer from "./IngredientContainer";
import { IngredientsInput, Meals } from "./types";
import style from "./style.scss";
import Input from "Components/Input";
import {
  MEAL_EDIT_MUTATION,
  MEAL_NAME_MUTATION,
} from "Schema/mutations/meal.mutations";
import useState from "Hooks/useState";
import useMutation from "Hooks/useMutation";

interface Props {
  mealData?: Meals;
  isEdit?: boolean;
  onChange: () => void;
}

interface State {
  addSuccessful: boolean;
}

const AddMealForm = ({ isEdit, mealData, onChange }: Props) => {
  const [state, setState] = useState<State>({
    addSuccessful: false,
  });

  const ingredientInputRef = useRef<IngredientsInput[]>();
  const mealInputRef = useRef<ElementRef<"input">>(null);

  const [addMeal, addMealData] = useMutation(MEAL_NAME_MUTATION);
  const [editMeal, editMealData] = useMutation(MEAL_EDIT_MUTATION);

  const setInputData = (data: IngredientsInput[]) => {
    ingredientInputRef.current = data;
  };

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      editMeal({
        variables: {
          id: mealData.id,
          name: mealInputRef.current.value,
          ingredients: ingredientInputRef.current,
        },
        update: () => {
          onChange();
          setState({ addSuccessful: true });
        },
      });

      return;
    }

    addMeal({
      variables: {
        name: mealInputRef.current?.value,
        ingredients: ingredientInputRef.current,
      },
      update: () => {
        onChange();
        setState({ addSuccessful: true });
      },
    });
  };

  if (state.addSuccessful) {
    return (
      <div>
        <p>Meal has been successfully added!</p>
      </div>
    );
  }

  return (
    <form className={style.addMealFormWrapper} onSubmit={submitProduct}>
      <IngredientContainer
        onInput={setInputData}
        data={mealData?.ingredients}
        error={addMealData?.error || editMealData.error}
        isLoading={addMealData.loading || editMealData.loading}
      />
    </form>
  );
};

export default AddMealForm;
