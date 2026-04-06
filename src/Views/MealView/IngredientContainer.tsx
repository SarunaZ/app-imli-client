import { useEffect } from "react";
import IngredientInput from "./IngredientInput";
import Button from "Components/Button";
import ErrorHandler from "Components/ErrorHandler";
import { ApolloError } from "@apollo/client";
import useState from "Hooks/useState";
import { IngredientsInput, Meals } from "./types";

interface Props {
  data: Meals["ingredients"];
  isLoading: boolean;
  error?: ApolloError;
  onInput: (data: IngredientsInput[]) => void;
}

const defaultInputValue = { name: "" };

interface State {
  inputState?: IngredientsInput[];
}

const IngredientContainer = ({ data, error, isLoading, onInput }: Props) => {
  const [state, setState] = useState<State>({
    inputState: [defaultInputValue],
  });

  useEffect(() => {
    setState({
      inputState: data?.map((item) => ({ name: item.name })) || [defaultInputValue],
    });
  }, [data]);

  const handleAddInput = () => {
    setState((prev) => ({
      inputState: [...prev.inputState, defaultInputValue],
    }));
  };

  const handleRemoveInput = (index: number) => {
    if (state.inputState.length === 1) return;

    const newInputState = state.inputState.filter((_, i) => index !== i);
    setState({ inputState: newInputState });
    onInput(newInputState);
  };

  const handleInputChange = (inputValue: string) => (index: number) => {
    const copy = [...state.inputState];
    copy[index] = { name: inputValue };
    setState({ inputState: copy });
    onInput(copy);
  };

  return (
    <>
      <label className="text-base font-semibold text-text">Ingredients</label>
      <div className="max-h-[calc(100vh-390px)] space-y-2 overflow-auto md:max-h-[450px]">
        {state.inputState?.map((input, index) => (
          <IngredientInput
            key={index}
            index={index}
            inputValue={input.name}
            onDelete={handleRemoveInput}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <ErrorHandler error={error} />
      <div className="flex gap-4">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          Submit
        </Button>
        <Button
          type="button"
          buttonStyle="hollow"
          onClick={handleAddInput}
          className="h-14 w-14"
        >
          +
        </Button>
      </div>
    </>
  );
};

export default IngredientContainer;
