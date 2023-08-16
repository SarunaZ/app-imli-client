import Dropdown from "Components/Dropdown";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import IconButton from "Components/IconButton";
import style from "./style.scss";
import { PRODUCT_DELETE } from "Schema/mutations/productMutations";
import { useMutation } from "@apollo/client";

interface Props {
  id: string;
  isDisabled?: boolean;
  onChange: (id: string) => void;
  onEditProduct: () => void;
}
const ProductDropdown = ({
  id,
  isDisabled,
  onChange,
  onEditProduct,
}: Props) => {
  const [deleteProductM, deleteProductData] = useMutation(PRODUCT_DELETE, {
    errorPolicy: "all",
  });

  const deleteProduct = (id: string) => () => {
    deleteProductM({
      variables: {
        id,
      },
      update: () => onChange(id),
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
