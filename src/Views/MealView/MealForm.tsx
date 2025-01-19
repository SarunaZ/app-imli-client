import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import style from "./style.scss";
import Input from "Components/Input";
import { SyntheticEvent, useRef } from "react";
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
import useQuery from "Hooks/useQuery";
import { MEAL_LIST_DATA } from "Schema/queries/meal.queries";
import { useNavigate, useParams } from "react-router-dom";
import ErrorHandler from "Components/ErrorHandler";
import { ROUTE_MEAL_PAGE } from "App/constants";

interface State {
  mealData?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
  isLoaded: boolean;
  addSuccessful: boolean;
}

const MealForm = () => {
  const [state, setState] = useState<State>({
    isLoaded: false,
    addSuccessful: false,
    mealData: undefined,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error } = useQuery(MEAL_LIST_DATA, {
    skip: !id,
    onCompleted: (res) => {
      setState({ mealData: res.meals.find((meal) => meal.id === id) });
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const ingredientInputRef = useRef<IngredientsInput[]>(null);
  const mealInputRef = useRef<HTMLInputElement>(null);
  const mealInstructionsRef = useRef<string>(null);

  const [addMeal, addMealData] = useMutation(MEAL_NAME_MUTATION);
  const [editMeal, editMealData] = useMutation(MEAL_EDIT_MUTATION);

  const setInputData = (data: IngredientsInput[]) => {
    ingredientInputRef.current = data;
  };

  const isEdit = !!state.mealData;

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      editMeal({
        variables: {
          id,
          name: mealInputRef.current.value,
          ingredients:
            ingredientInputRef.current ||
            state.mealData.ingredients.map((item) => ({
              name: item.name,
            })),
          instructions:
            mealInstructionsRef.current || state.mealData.instructions,
        },
        update: () => {
          setState({ addSuccessful: true });
          navigate(ROUTE_MEAL_PAGE);
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
        formRef.current.reset();
        setState({ addSuccessful: true });
      },
    });
  };

  const onEditorChange = (e: string) => {
    mealInstructionsRef.current = e;
  };

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <div className={style.mealFormContainer}>
      <h1 className={style.mealFormTitle}>Add your meal</h1>
      <form ref={formRef} onSubmit={submitProduct} className={style.mealForm}>
        <Input
          required
          label="Meal name"
          name="productName"
          ref={mealInputRef}
          defaultValue={state.mealData?.name}
        />
        <div className={style.mealEditor}>
          {/*Todo: consider using Tiptap*/}
          {!state.isLoaded && <Loader />}
          <Editor
            initialValue={state.mealData?.instructions}
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
          data={state.mealData?.ingredients}
          error={addMealData?.error || editMealData.error}
          isLoading={addMealData.loading || editMealData.loading}
        />
        {state.addSuccessful && (
          <span className={style.addSuccessful}>
            Meal has been successfully added!
          </span>
        )}
      </form>
    </div>
  );
};

export default MealForm;
