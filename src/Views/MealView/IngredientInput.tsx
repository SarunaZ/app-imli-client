import React, { SyntheticEvent } from 'react';

interface Props {
  index: number;
  inputValue: string;
  onDelete: (index: number) => void;
  onChange: (inputValue: string) => (index: number) => void;
}
const IngredientInput = ({ index, onDelete, onChange, inputValue }: Props) => (
  <React.Fragment key={index}>
    <button type="button" onClick={() => onDelete(index)}>-</button>
    <input required value={inputValue} onChange={
      (e: SyntheticEvent<HTMLInputElement>) => onChange(e.currentTarget.value)(index)
    }
    />
  </React.Fragment>
);

export default IngredientInput;
