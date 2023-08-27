import React, { useState } from "react";
import Box from "Components/Box";
import style from "./style.scss";

import classnames from "classnames";
import ProductDropdown from "./ProductDropdown";
import ProductItemInput from "./ProductItemInput";

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
  isCompleted,
  onProductEdit,
}: Props) => {
  const [isEdit, setShowEdit] = useState<boolean>(false);

  const handleEditProduct = () => {
    setShowEdit(true);
  };

  const completeProduct = (value: boolean) => () => {
    onComplete(id, value);
  };

  const productItemClass = classnames(style.productListItem, {
    [style.completed]: isCompleted,
  });

  const editProduct = (value?: string) => {
    onProductEdit(id, value);
    setShowEdit(false);
  };

  const submitForm = (value: string) => {
    editProduct(value);
  };

  return (
    <li className={style.productListItemWrapper}>
      <Box id={id} isDragable className={productItemClass}>
        <ProductDropdown
          id={id}
          onChange={onChange}
          isDisabled={isCompleted}
          onEditProduct={handleEditProduct}
        />
        <ProductItemInput
          isEdit={isEdit}
          productName={name}
          onEdit={editProduct}
          onSubmit={submitForm}
          isCompleted={isCompleted}
          onCompleteProduct={completeProduct}
        />
      </Box>
    </li>
  );
};

export default ProductItem;
