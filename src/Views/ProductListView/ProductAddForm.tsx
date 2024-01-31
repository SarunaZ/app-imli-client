import React, { ElementRef } from "react";
import style from "./style.scss";
import { SyntheticEvent, useRef } from "react";
import Button from "Components/Button";
import ErrorHandler from "Components/ErrorHandler";
import { PRODUCT_NAME_MUTATION } from "Schema/mutations/productMutations";
import { Product } from "Schema/types";
import useMutation from "Hooks/useMutation";

interface Props {
  onChange: (productItem: Product) => void;
}

const ProductAddForm = ({ onChange }: Props) => {
  const productInputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const [addProductQ, productQData] = useMutation(PRODUCT_NAME_MUTATION);

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addProductQ({
      variables: {
        name: productInputRef.current?.value,
      },
      update: (_, res) => {
        const newItem = {
          name: res?.data.createProduct.name,
          isDone: res?.data.createProduct.isDone,
          id: res.data.createProduct.id,
        };

        formRef.current?.reset();
        onChange(newItem);
      },
    });
  };

  return (
    <form ref={formRef} onSubmit={submitProduct} className={style.inputForm}>
      <label className={style.formLabel} htmlFor="productName">
        Product
      </label>
      <input
        required
        className={style.formInput}
        ref={productInputRef}
        name="productName"
        type="text"
      />
      <ErrorHandler error={productQData.error} />
      <Button type="submit" isLoading={productQData.loading}>
        <span>Add</span>
      </Button>
    </form>
  );
};

export default ProductAddForm;
