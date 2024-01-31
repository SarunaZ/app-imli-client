import Box from "Components/Box";
import style from "./style.scss";

import classnames from "classnames";
import ProductDropdown from "./ProductDropdown";
import ProductItemInput from "./ProductItemInput";
import useState from "Hooks/useState";

interface Props {
  id: string;
  name?: string | null;
  isCompleted: boolean;
  onDelete: (id: string) => void;
  onChange: (id: string, value: boolean | string) => void;
}

interface State {
  isEdit: boolean;
}

const ProductItem = ({ id, name, onChange, onDelete, isCompleted }: Props) => {
  const [state, setState] = useState<State>({
    isEdit: false,
  });

  const handleEditProduct = () => {
    setState({ isEdit: true });
  };

  const completeProduct = (value: boolean) => () => {
    onChange(id, value);
  };

  const productItemClass = classnames(style.productListItem, {
    [style.completed]: isCompleted,
  });

  const editProduct = (value?: string) => {
    onChange(id, value);
    setState({ isEdit: false });
  };

  return (
    <li className={style.productListItemWrapper}>
      <Box id={id} isDragable>
        <div className={productItemClass}>
          <ProductDropdown
            id={id}
            onChange={onDelete}
            isDisabled={isCompleted}
            onEditProduct={handleEditProduct}
          />
          <ProductItemInput
            isEdit={state.isEdit}
            productName={name}
            onEdit={editProduct}
            isCompleted={isCompleted}
            onCompleteProduct={completeProduct}
          />
        </div>
      </Box>
    </li>
  );
};

export default ProductItem;
