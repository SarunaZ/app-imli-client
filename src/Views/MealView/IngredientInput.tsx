import Button from "Components/Button";
import Input from "Components/Input";
import { SyntheticEvent } from "react";

interface Props {
  index: number;
  inputValue: string;
  onDelete: (index: number) => void;
  onChange: (inputValue: string) => (index: number) => void;
}

const IngredientInput = ({ index, onDelete, onChange, inputValue }: Props) => {
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)(index);
  };

  return (
    <div className="flex items-center gap-4">
      <Input value={inputValue} onChange={handleChange} className="flex-1" />
      <Button className="h-14 w-14 shrink-0" onClick={() => onDelete(index)}>
        -
      </Button>
    </div>
  );
};

export default IngredientInput;
