import Dropdown from "Components/Dropdown";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import IconButton from "Components/IconButton";
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

const ProductDropdown = ({ id, isDisabled, onDelete, onError, onEditProduct }: Props) => {
  const [deleteProductM, deleteProductData] = useMutation(PRODUCT_DELETE);

  const deleteProduct = (productId: string) => () => {
    deleteProductM({
      variables: { id: productId },
      update: () => onDelete(productId),
      onError: (error) => onError(error),
    });
  };

  return (
    <Dropdown isDisabled={isDisabled}>
      <IconButton onClick={onEditProduct} isLoading={deleteProductData.loading}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Edit</span>
          <Edit className="h-4 w-4 text-secondary" />
        </div>
      </IconButton>
      <IconButton onClick={deleteProduct(id)} isLoading={deleteProductData.loading}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Delete</span>
          <Delete className="h-4 w-4" />
        </div>
      </IconButton>
    </Dropdown>
  );
};

export default ProductDropdown;
