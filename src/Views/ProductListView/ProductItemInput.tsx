import React, { SyntheticEvent, useRef } from "react";
import style from "./style.scss";
import CurvedArrow from "Images/icons/curved-arrow-right.svg";
import CheckMark from "Images/icons/checkmark.svg";

interface Props {
  isEdit: boolean;
  isCompleted: boolean;
  productName: string;
  onEdit: (id: string) => void;
  onSubmit: (inputValue: string) => void;
  onCompleteProduct: (value: boolean) => () => void;
}

const ProductItemInput = ({
  isEdit,
  onEdit,
  onSubmit,
  productName,
  isCompleted,
  onCompleteProduct,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitName = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(inputRef.current.value);
  };

  const handleOnEdit = () => {
    console.log("clock");

    onEdit(inputRef.current.value);
  };

  return (
    <>
      {!isEdit && (
        <span className={style.productListItemTitle}>{productName}</span>
      )}
      {isEdit && (
        <form onSubmit={submitName} className={style.productListItemForm}>
          <input
            autoFocus
            ref={inputRef}
            className={style.productListItemInput}
            defaultValue={productName}
          />
        </form>
      )}
      {isEdit && (
        <button
          type="button"
          onClick={handleOnEdit}
          className={style.productListItemButtons}
        >
          <CheckMark height="25px" />
        </button>
      )}
      {!isEdit && (
        <button
          type="button"
          className={style.productListItemButtons}
          onClick={onCompleteProduct(!isCompleted)}
        >
          {!isCompleted ? (
            <CheckMark height="25px" />
          ) : (
            <CurvedArrow height="20px" className={style.returnIcon} />
          )}
        </button>
      )}
    </>
  );
};

export default ProductItemInput;
