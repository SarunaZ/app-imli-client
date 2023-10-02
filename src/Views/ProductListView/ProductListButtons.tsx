import React from "react";
import MealAddIcon from "Images/icons/meal.svg";
import Cancel from "Images/icons/cancel.svg";
import style from "./style.scss";
import MealDropdown from "./MealDropdown";
import ProductCancelModal from "./ProductCancelModal";
import useState from "Hooks/useState";

interface Props {
  onChange: () => void;
}

interface State {
  toggleMealModal: boolean;
  openCancelModal: boolean;
}

const ProductListButtons = ({ onChange }: Props) => {
  const [state, setState] = useState<State>({
    toggleMealModal: false,
    openCancelModal: false,
  });

  const handleModalToggle = () => {
    setState({
      toggleMealModal: !state.toggleMealModal,
    });
  };

  const handleCancelList = () => {
    setState({
      openCancelModal: !state.openCancelModal,
    });
  };

  const handleOnChangeCancel = () => {
    onChange();
    setState({ openCancelModal: false });
  };

  return (
    <>
      <div className={style.productListButtons}>
        <button
          className={style.mealDropdownAddButton}
          onClick={handleModalToggle}
        >
          <MealAddIcon className={style.mealListAddIcon} />
        </button>
        <button className={style.cancelList} onClick={handleCancelList}>
          <Cancel width="50px" height="50px" className={style.cancelListIcon} />
        </button>
      </div>
      <MealDropdown
        onUpdate={onChange}
        title={"Please select meal"}
        isOpen={state.toggleMealModal}
        onClose={handleModalToggle}
      />
      <ProductCancelModal
        title={"Complete product list?"}
        isOpen={state.openCancelModal}
        onClose={handleCancelList}
        onChange={handleOnChangeCancel}
      />
    </>
  );
};

export default ProductListButtons;
