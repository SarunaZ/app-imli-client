import React from "react";
import style from "./style.scss";
import MealListItem from "./MealListItem";
import AddMealModal from "./AddMealModal";
import Add from "Images/icons/add.svg";
import { useState } from "react";
import { MealListQuery } from "Schema/types";

interface Props {
  mealData: MealListQuery["meals"];
  onChange: () => void;
}

const MealList = ({ mealData, onChange }: Props) => {
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false);

  const toggleAddModal = () => {
    setShowAddModal((prev) => !prev);
  };

  return (
    <>
      <ul className={style.mealList}>
        {mealData?.map((meal) => (
          <MealListItem
            data={meal}
            onDelete={onChange}
            onEdit={onChange}
            key={meal.id}
          />
        ))}
      </ul>
      <AddMealModal
        onClose={toggleAddModal}
        isOpen={isShowAddModal}
        title="Add new meals"
        onChange={onChange}
      />
      <button className={style.mealListAddButton} onClick={toggleAddModal}>
        <Add className={style.mealListAddIcon} />
      </button>
    </>
  );
};

export default MealList;
