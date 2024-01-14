import Box from "Components/Box";
import style from "./style.scss";

import classnames from "classnames";
import ProductDropdown from "./ProductDropdown";
import ProductItemInput from "./ProductItemInput";
import useState from "Hooks/useState";

interface Props {
  id: string;
  name?: string | null;
  index: number;
  isCompleted: boolean;
  onChange: (id: string) => void;
  onComplete: (id: string, value: boolean) => void;
  onProductEdit: (id: string, value?: string) => void;
}

interface State {
  isEdit: boolean;
}

const ProductItem = ({
  id,
  name,
  onChange,
  onComplete,
  isCompleted,
  onProductEdit,
}: Props) => {
  const [state, setState] = useState<State>({
    isEdit: false,
  });

  const handleEditProduct = () => {
    setState({ isEdit: true });
  };

  const completeProduct = (value: boolean) => () => {
    onComplete(id, value);
  };

  const productItemClass = classnames(style.productListItem, {
    [style.completed]: isCompleted,
  });

  const editProduct = (value?: string) => {
    onProductEdit(id, value);
    setState({ isEdit: false });
  };

  const submitForm = (value: string) => {
    editProduct(value);
  };

  return (
    <li className={style.productListItemWrapper}>
      <Box id={id} isDragable>
        <div className={productItemClass}>
          <ProductDropdown
            id={id}
            onChange={onChange}
            isDisabled={isCompleted}
            onEditProduct={handleEditProduct}
          />
          <ProductItemInput
            isEdit={state.isEdit}
            productName={name}
            onEdit={editProduct}
            onSubmit={submitForm}
            isCompleted={isCompleted}
            onCompleteProduct={completeProduct}
          />
        </div>
      </Box>
    </li>
  );
};

export default ProductItem;
