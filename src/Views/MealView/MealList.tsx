import React from "react";
import style from "./style.scss";
import MealListItem from "./MealListItem";
import { MealListQuery } from "Schema/types";

interface Props {
  onEdit: (id: string) => void;
  mealData: MealListQuery["meals"];
  onChange: () => void;
}

const MealList = ({ mealData, onChange, onEdit }: Props) => {
  // const [isShowAddModal, setShowAddModal] = useState<boolean>(false);

  // const toggleAddModal = () => {
  //   setShowAddModal((prev) => !prev);
  // };

  return (
    <>
      <ul className={style.mealList}>
        {mealData?.map((meal) => (
          <MealListItem
            data={meal}
            onDelete={onChange}
            onEdit={onEdit}
            key={meal.id}
          />
        ))}
      </ul>
    </>
  );
};

export default MealList;
