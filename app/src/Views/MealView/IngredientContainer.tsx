import React, { useState } from "react";
import IngredientInput from "./IngredientInput";
import { IngredientsInput } from "./types";
import style from "./style.scss";
import Button from "Components/Button";
import ErrorHandler from "Components/ErrorHandler";
import { ApolloError } from "@apollo/client";

interface Props {
  isLoading: boolean;
  error?: ApolloError;
  inputData: (data: IngredientsInput[]) => void;
}

const defaultInputValue = {
  name: "",
};

const IngredientContainer = ({
  error,
  isLoading,
  inputData,
}: Props) => {
  const [inputState, setInputState] = useState<IngredientsInput[]>([
    defaultInputValue,
  ]);

  const handleAddInput = () => {
    setInputState((prev) => [...prev, defaultInputValue]);
  };

  const handleRemoveInput = (index: number) => {
    if (inputState.length === 1) {
      return;
    }

    const newInputState = inputState.filter((value, arrIndex) => {
      return index !== arrIndex;
    });

    setInputState(newInputState);
    inputData(inputState);
  };

  const handleInputChange =
    (inputValue: string) => (index: number) => {
      const shallowCopyOfState = [...inputState];
      shallowCopyOfState[index] = { name: inputValue };
      setInputState(shallowCopyOfState);
      inputData(inputState);
    };

  return (
    <>
      <label className={style.indredientFieldLabel}>
        Ingredients
      </label>
      <div className={style.indredientFieldsrapper}>
        {inputState.map((input, index) => (
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
          isHollow
          type="button"
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
