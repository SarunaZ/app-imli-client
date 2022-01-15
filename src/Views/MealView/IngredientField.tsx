import React, {SyntheticEvent, useState} from 'react';
import IngredientInput from "./IngredientInput";
import {IngredientsInput} from "./types";

interface Props {
  inputData: (data: IngredientsInput[]) => void;
}

const defaultInputValue = {
  name: ''
};

const IngredientField = ({ inputData }: Props) => {
  const [inputState, setInputState] = useState<IngredientsInput[]>(
    [defaultInputValue]
  );

  const handleAddInput = () => {
    setInputState(prev => [...prev, defaultInputValue]);
    console.log(inputState, 'state')
  }

  const handleRemoveInput = (index: number) => {
    if (inputState.length === 1) {
      return;
    }

    const newInputState = inputState.filter((value, arrIndex) => {
      return index !== arrIndex;
    });

    const testArr = ['text1', 'text2', 'text3', 'text4'];
    console.log(testArr.splice(1, 2))
    const inputStateCopy = inputState.splice(index, 1);
    console.log(newInputState)
    setInputState(newInputState);
    inputData(inputState);
  };

  const handleInputChange = (inputValue: string) => (index: number) => {
    const shallowCopyOfState = [...inputState];
    shallowCopyOfState[index] = { name: inputValue };
    setInputState(shallowCopyOfState);
    inputData(inputState);
  }

  return (
    <>
      <label>Ingredients</label>
      {inputState.map((input, index) => (
        <IngredientInput
          key={index}
          index={index}
          inputValue={inputState[index].name}
          onDelete={handleRemoveInput}
          onChange={handleInputChange}
        />
      ))}
      <button type="button" onClick={handleAddInput}>+</button>
    </>
  );
};

export default IngredientField;
