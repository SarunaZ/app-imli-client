import React from "react";
import MealAddIcon from "Images/icons/meal.svg";
import Cancel from "Images/icons/cancel.svg";
import style from "./style.scss";
import MealDropdown from "./MealDropdown";
import { useState } from "react";
import ProductCancelModal from "./ProductCancelModal";

interface Props {
  onChange: () => void;
}

const ProductListButtons = ({ onChange }: Props) => {
  const [toggleMealModal, setToggleMealModal] = useState<boolean>(false);
  const [openCancelModal, setCancelModal] = useState<boolean>(false);

  const handleModalToggle = () => {
    setToggleMealModal((prev) => !prev);
  };

  const handleCancelList = () => {
    setCancelModal((prev) => !prev);
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
        isOpen={toggleMealModal}
        onClose={handleModalToggle}
      />
      <ProductCancelModal
        title={"Complete product list?"}
        isOpen={openCancelModal}
        onClose={handleCancelList}
        onChange={() => {
          onChange();
          setCancelModal(false);
        }}
      />
    </>
  );
};

export default ProductListButtons;
