import { ElementRef, SyntheticEvent, useRef } from "react";
import CurvedArrow from "Images/icons/curved-arrow-right.svg";
import CheckMark from "Images/icons/checkmark.svg";
import Button from "Components/Button";

interface Props {
  isEdit: boolean;
  isLoading: boolean;
  isCompleted: boolean;
  productName: string;
  onEdit: (inputValue: string) => void;
  onCompleteProduct: (value: boolean) => () => void;
}

const ProductItemInput = ({
  isEdit,
  onEdit,
  isLoading,
  productName,
  isCompleted,
  onCompleteProduct,
}: Props) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  const submitName = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(inputRef.current.value);
  };

  return (
    <>
      {!isEdit && (
        <span className="mr-auto text-base capitalize text-text md:text-lg">
          {productName}
        </span>
      )}
      {isEdit && (
        <form onSubmit={submitName} className="w-full">
          <input
            autoFocus
            ref={inputRef}
            className="relative z-[2] h-8 w-full rounded border border-border bg-surface px-2.5 text-sm text-text md:text-base"
            defaultValue={productName}
          />
        </form>
      )}
      {isEdit && (
        <Button
          type="button"
          buttonStyle="none"
          onClick={() => onEdit(inputRef.current.value)}
          className="relative z-[2] text-secondary"
        >
          <CheckMark className="h-6 w-6" />
        </Button>
      )}
      {!isEdit && (
        <Button
          type="button"
          buttonStyle="none"
          isLoading={isLoading}
          onClick={onCompleteProduct(!isCompleted)}
          className="relative z-[2] text-secondary"
        >
          {!isCompleted ? (
            <CheckMark className="h-7 w-7" />
          ) : (
            <CurvedArrow className="h-7 w-7 -scale-x-100" />
          )}
        </Button>
      )}
    </>
  );
};

export default ProductItemInput;
