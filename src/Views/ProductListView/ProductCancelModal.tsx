import React from "react";
import style from "./style.scss";
import { useMutation } from "@apollo/client";
import { PRODUCTS_LIST_CANCEL_MUTATION } from "Schema/mutations/productMutations";
import withModal from "HOC/withModal";
import Button from "Components/Button";
import ErrorHandler from "Components/ErrorHandler";

interface Props {
  onChange: () => void;
}

const ProductCancelModal = ({ onChange }: Props) => {
  const [cancelProductList, { loading, error }] = useMutation(
    PRODUCTS_LIST_CANCEL_MUTATION,
    { errorPolicy: "all" },
  );

  const handleOnChange = () => {
    cancelProductList({
      update: () => onChange(),
    });
  };

  return (
    <div className={style.productListCompleteModal}>
      <ErrorHandler error={error} />
      <Button isLoading={loading} onClick={handleOnChange}>
        Confirm
      </Button>
    </div>
  );
};

export default withModal(ProductCancelModal);
