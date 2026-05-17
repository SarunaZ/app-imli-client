import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
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
import Skeleton from "Components/Skeleton";
import { editorConfig } from "Views/MealView/constants";
import useQuery from "Hooks/useQuery";
import { MEAL_LIST_DATA } from "Schema/queries/meal.queries";
import { useNavigate, useParams } from "react-router-dom";
import ErrorHandler from "Components/ErrorHandler";
import { ROUTE_MEAL_PAGE } from "App/constants";
import { useToast } from "Providers/ToastProvider";

interface State {
  mealData?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
  isLoaded: boolean;
}

const MealForm = () => {
  const [state, setState] = useState<State>({
    isLoaded: false,
    mealData: undefined,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

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
            state.mealData.ingredients.map((item) => ({ name: item.name })),
          instructions:
            mealInstructionsRef.current || state.mealData.instructions,
        },
        update: () => {
          navigate(ROUTE_MEAL_PAGE);
          toast.success("Meal updated successfully");
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
        formRef.current?.reset();
        navigate(ROUTE_MEAL_PAGE);
        toast.success("Meal added successfully");
      },
    });
  };

  const onEditorChange = (e: string) => {
    mealInstructionsRef.current = e;
  };

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-0">
      <h1 className="mb-6 text-2xl font-bold text-text">Add your meal</h1>
      <form ref={formRef} onSubmit={submitProduct} className="grid gap-5">
        <Input
          required
          label="Meal name"
          name="productName"
          ref={mealInputRef}
          defaultValue={state.mealData?.name}
        />
        <div className="relative min-h-[500px]">
          {!state.isLoaded && (
            <Skeleton className="absolute inset-0 h-[500px] w-full" />
          )}
          <div className={!state.isLoaded ? "invisible" : undefined}>
            <Editor
              initialValue={state.mealData?.instructions}
              init={editorConfig}
              apiKey={import.meta.env.VITE_CLIENT_TINY_MCE_EDITOR_KEY}
              onEditorChange={onEditorChange}
              onInit={() => setState({ isLoaded: true })}
            />
          </div>
        </div>
        <IngredientContainer
          onInput={setInputData}
          data={state.mealData?.ingredients}
          error={addMealData?.error || editMealData.error}
          isLoading={addMealData.loading || editMealData.loading}
        />
      </form>
    </div>
  );
};

export default MealForm;
