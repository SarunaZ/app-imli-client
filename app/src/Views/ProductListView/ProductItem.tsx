import React, { SyntheticEvent, useRef, useState } from "react";
import Box from "Components/Box";
import style from "./style.scss";
import { useMutation } from "@apollo/client";
import { PRODUCT_COMPLETE } from "Schema/mutations/productMutations";
import CurvedArrow from "Images/icons/curved-arrow-right.svg";
import CheckMark from "Images/icons/checkmark.svg";
import classnames from "classnames";
import Loader from "Components/Loader";
import ProductDropdown from "./ProductDropdown";

interface Props {
  id: string;
  name?: string | null;
  index: number;
  isCompleted: boolean;
  onChange: (id: string) => void;
  onComplete: (id: string, value: boolean) => void;
  onProductEdit: (id: string, value?: string) => void;
}

const ProductItem = ({
  id,
  name,
  onChange,
  onComplete,
  index,
  isCompleted,
  onProductEdit,
}: Props) => {
  const [isEdit, setShowEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [completeProductM, completeProductData] = useMutation(
    PRODUCT_COMPLETE,
    { errorPolicy: "all" },
  );

  const handleEditProduct = () => {
    setShowEdit(true);
  };

  const completeProduct = (value: boolean) => () => {
    console.log("click");

    completeProductM({
      variables: {
        id,
        value,
      },
      update: () => onComplete(id, value),
    });
  };

  const productItemClass = classnames(style.productListItem, {
    [style.completed]: isCompleted,
  });

  const editProduct = () => {
    console.log("click");

    onProductEdit(id, inputRef.current?.value);
    setShowEdit(false);
  };

  const submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    editProduct();
  };

  const InputIcons = () => {
    if (isEdit) {
      return (
        <button
          type="button"
          className={style.productListItemButtons}
          onClick={editProduct}
        >
          <CheckMark height="25px" />
        </button>
      );
    }

    if (!isCompleted) {
      return (
        <button
          type="button"
          className={style.productListItemButtons}
          onClick={completeProduct(true)}
        >
          {!completeProductData.loading ? (
            <CheckMark height="25px" />
          ) : (
            <Loader />
          )}
        </button>
      );
    }

    return (
      <button
        type="button"
        className={style.productListItemButtons}
        onClick={completeProduct(false)}
      >
        {!completeProductData.loading ? (
          <CurvedArrow height="20px" className={style.returnIcon} />
        ) : (
          <Loader />
        )}
      </button>
    );
  };

  return (
    <li className={style.productListItemWrapper}>
      <Box id={id} isDragable className={productItemClass}>
        <div className={style.productListItemFirst}>
          <ProductDropdown
            id={id}
            onChange={onChange}
            isDisabled={isCompleted}
            onEditProduct={handleEditProduct}
          />
          {isEdit ? (
            <form
              onSubmit={submitForm}
              className={style.productListItemForm}
            >
              <input
                autoFocus
                ref={inputRef}
                className={style.productListItemInput}
                defaultValue={name!}
              />
            </form>
          ) : (
            <span className={style.productListItemTitle}>{name}</span>
          )}
        </div>
        <InputIcons />
      </Box>
    </li>
  );
};

export default ProductItem;
