import React, { useState } from "react";
import Box from "Components/Box";
import style from "./style.scss";
import IconButton from "Components/IconButton";
import DeleteMealModal from "./DeleteMealModal";
import Delete from "Images/icons/delete.svg";

interface Props {
  onDelete: () => void;
  data?: {
    id: string;
    name: string;
    ingredients: {
      name: string;
    }[];
  };
}

const MealListItem = ({ data, onDelete }: Props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] =
    useState<boolean>(false);
  const toggleDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  return (
    <>
      <Box>
        <li className={style.mealListItem}>
          <div className={style.mealListItemHeader}>
            <p className={style.mealListItemTitle}>{data?.name}</p>
            <IconButton onClick={toggleDeleteModal}>
              <Delete height="24px" width="24px" />
            </IconButton>
          </div>
          <ol className={style.mealListItemIngredients}>
            {data?.ingredients.map((ingredient) => (
              <li
                key={data?.id + ingredient.name}
                className={style.mealListItemIngredientsItem}
              >
                {ingredient.name}
              </li>
            ))}
          </ol>
        </li>
      </Box>
      <DeleteMealModal
        id={data?.id}
        onChange={onDelete}
        isOpen={isDeleteModalOpen}
        onClose={toggleDeleteModal}
      />
    </>
  );
};

export default MealListItem;
