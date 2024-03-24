import React, { ElementRef } from "react";
import style from "./style.scss";
import { SyntheticEvent, useRef } from "react";
import ErrorHandler from "Components/ErrorHandler";
import { PRODUCT_NAME_MUTATION } from "Schema/mutations/product.mutations";
import { Product } from "Schema/types";
import useMutation from "Hooks/useMutation";
import Loader from "Components/Loader";

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
      <div className={style.formInputWrapper}>
        <input
          required
          className={style.formInput}
          ref={productInputRef}
          name="productName"
          type="text"
        />
        {productQData.loading && (
          <div className={style.formInputLoader}>
            <Loader />
          </div>
        )}
      </div>
      <ErrorHandler error={productQData.error} />
    </form>
  );
};

export default ProductAddForm;
