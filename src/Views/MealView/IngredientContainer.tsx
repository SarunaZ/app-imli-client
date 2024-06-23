import React, { useEffect } from "react";
import IngredientInput from "./IngredientInput";
import style from "./style.scss";
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

const defaultInputValue = {
  name: "",
};

interface State {
  inputState?: IngredientsInput[];
}

const IngredientContainer = ({ data, error, isLoading, onInput }: Props) => {
  const [state, setState] = useState<State>({
    inputState: [defaultInputValue],
  });

  useEffect(() => {
    setState({
      inputState: data?.map((item) => ({
        name: item.name,
      })) || [defaultInputValue],
    });
  }, [data]);

  const handleAddInput = () => {
    setState((prev) => ({
      inputState: [...prev.inputState, defaultInputValue],
    }));
  };

  const handleRemoveInput = (index: number) => {
    if (state.inputState.length === 1) {
      return;
    }

    const newInputState = state.inputState.filter((value, arrIndex) => {
      return index !== arrIndex;
    });

    setState({ inputState: newInputState });
    onInput(newInputState);
  };

  const handleInputChange = (inputValue: string) => (index: number) => {
    const shallowCopyOfState = [...state.inputState];
    shallowCopyOfState[index] = { name: inputValue };
    setState({ inputState: shallowCopyOfState });
    onInput(shallowCopyOfState);
  };

  return (
    <>
      <label className={style.indredientFieldLabel}>Ingredients</label>
      <div className={style.indredientFieldsrapper}>
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
      <div className={style.indredientFieldButtonWrapper}>
        <Button
          type="submit"
          isLoading={isLoading}
          className={style.indredientFieldButtonSubmit}
        >
          Submit
        </Button>
        <Button
          type="button"
          buttonStyle="hollow"
          onClick={handleAddInput}
          className={style.indredientFieldAddButton}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default IngredientContainer;
