import React from "react";
import Dropdown from "Components/Dropdown";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import IconButton from "Components/IconButton";
import style from "./style.scss";
import { PRODUCT_DELETE } from "Schema/mutations/product.mutations";
import useMutation from "Hooks/useMutation";
import { ProductError } from "./types";

interface Props {
  id: string;
  isDisabled?: boolean;
  onDelete: (id: string) => void;
  onEditProduct: () => void;
  onError: (error: ProductError) => void;
}

const ProductDropdown = ({
  id,
  isDisabled,
  onDelete,
  onError,
  onEditProduct,
}: Props) => {
  const [deleteProductM, deleteProductData] = useMutation(PRODUCT_DELETE);

  const deleteProduct = (id: string) => () => {
    deleteProductM({
      variables: {
        id,
      },
      update: () => onDelete(id),
      onError: (error) => onError(error),
    });
  };

  return (
    <Dropdown isDisabled={isDisabled}>
      <>
        <IconButton
          onClick={onEditProduct}
          isLoading={deleteProductData.loading}
        >
          <div className={style.inline}>
            <span className={style.productListItemDropdownTitle}>{"Edit"}</span>
            <Edit height="16px" width="16px" className={style.editIcon} />
          </div>
        </IconButton>
      </>
      <>
        <IconButton
          onClick={deleteProduct(id)}
          isLoading={deleteProductData.loading}
        >
          <div className={style.inline}>
            <span className={style.productListItemDropdownTitle}>
              {"Delete"}
            </span>
            <Delete height="16px" width="16px" />
          </div>
        </IconButton>
      </>
    </Dropdown>
  );
};

export default ProductDropdown;
