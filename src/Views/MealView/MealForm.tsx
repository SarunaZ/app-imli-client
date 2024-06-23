import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import style from "./style.scss";
import Input from "Components/Input";
import { ElementRef, SyntheticEvent, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import IngredientContainer from "Views/MealView/IngredientContainer";
import useState from "Hooks/useState";
import { IngredientsInput } from "Views/MealView/types";
import useMutation from "Hooks/useMutation";
import {
  MEAL_EDIT_MUTATION,
  MEAL_NAME_MUTATION,
} from "Schema/mutations/meal.mutations";
import Loader from "Components/Loader";
import { editorConfig } from "Views/MealView/constants";

interface Props {
  mealData?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
  onChange: () => void;
}

interface State {
  isLoaded: boolean;
  addSuccessful: boolean;
}

const MealForm = ({ mealData, onChange }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<State>({
    isLoaded: false,
    addSuccessful: false,
  });

  const ingredientInputRef = useRef<IngredientsInput[]>();
  const mealInputRef = useRef<ElementRef<"input">>(null);
  const mealInstructionsRef = useRef<string>(null);

  const [addMeal, addMealData] = useMutation(MEAL_NAME_MUTATION);
  const [editMeal, editMealData] = useMutation(MEAL_EDIT_MUTATION);

  const setInputData = (data: IngredientsInput[]) => {
    ingredientInputRef.current = data;
  };

  const isEdit = !!mealData;

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      editMeal({
        variables: {
          id: mealData.id,
          name: mealInputRef.current.value,
          ingredients: ingredientInputRef.current,
          instructions: mealInstructionsRef.current,
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
        instructions: mealInstructionsRef.current,
      },
      update: () => {
        onChange();
        formRef.current.reset();
        setState({ addSuccessful: true });
      },
    });
  };

  const onEditorChange = (e: string) => {
    mealInstructionsRef.current = e;
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={submitProduct}
        className={style.mealFormContainer}
      >
        <Input
          required
          label="Meal name"
          name="productName"
          ref={mealInputRef}
          defaultValue={mealData?.name}
        />
        <div className={style.mealEditor}>
          {/*Todo: consider using Tiptap*/}
          {!state.isLoaded && <Loader />}
          <Editor
            init={editorConfig}
            apiKey={process.env.CLIENT_TINY_MCE_EDITOR_KEY}
            onEditorChange={onEditorChange}
            onInit={() => {
              setState({ isLoaded: true });
            }}
          />
        </div>
        <IngredientContainer
          onInput={setInputData}
          data={mealData?.ingredients}
          error={addMealData?.error || editMealData.error}
          isLoading={addMealData.loading || editMealData.loading}
        />
        {state.addSuccessful && (
          <span className={style.addSuccessful}>
            Meal has been successfully added!
          </span>
        )}
      </form>
    </>
  );
};

export default MealForm;
