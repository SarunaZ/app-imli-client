import Box from "Components/Box";
import ProductDropdown from "./ProductDropdown";
import ProductItemInput from "./ProductItemInput";
import useState from "Hooks/useState";
import {
  PRODUCT_COMPLETE,
  PRODUCT_RENAME_PRODUCT,
} from "Schema/mutations/product.mutations";
import { ProductError } from "./types";
import useMutation from "Hooks/useMutation";

interface Props {
  id: string;
  name?: string;
  index: number;
  isCompleted: boolean;
  onDelete: (id: string) => void;
  onError: (err: ProductError) => void;
  onRename: (id: string, value: string) => void;
  onCompleted: (id: string, value: boolean) => void;
}

interface State {
  isEdit: boolean;
}

const ProductItem = ({
  id,
  name,
  onCompleted,
  onDelete,
  isCompleted,
  onError,
  onRename,
}: Props) => {
  const [state, setState] = useState<State>({ isEdit: false });
  const [completeProduct, completeProductData] = useMutation(PRODUCT_COMPLETE);
  const [renameProduct, renameProductData] = useMutation(PRODUCT_RENAME_PRODUCT);

  const isLoading = renameProductData.loading || completeProductData.loading;

  const handleOnComplete = (value: boolean) => () => {
    completeProduct({
      variables: { id, value },
      update: () => onCompleted(id, value),
      onError: (error) => onError(error),
    });
  };

  const editProduct = (value?: string) => {
    renameProduct({
      variables: { id, value },
      update: () => {
        onRename(id, value);
        setState({ isEdit: false });
      },
      onError: (err) => onError(err),
    });
  };

  return (
    <Box id={id} as="li" isDraggable>
      <div className={`grid cursor-pointer grid-cols-[16px_1fr_36px] items-center gap-4 ${isCompleted ? "opacity-40" : ""}`}>
        <ProductDropdown
          id={id}
          onError={onError}
          onDelete={onDelete}
          isDisabled={isCompleted}
          onEditProduct={() => setState({ isEdit: true })}
        />
        <ProductItemInput
          productName={name}
          onEdit={editProduct}
          isLoading={isLoading}
          isEdit={state.isEdit}
          isCompleted={isCompleted}
          onCompleteProduct={handleOnComplete}
        />
      </div>
    </Box>
  );
};

export default ProductItem;
