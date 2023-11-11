import React from "react";
import Box from "Components/Box";
import style from "./style.scss";
import IconButton from "Components/IconButton";
import DeleteMealModal from "./DeleteMealModal";
import Delete from "Images/icons/delete.svg";
import useState from "Hooks/useState";
import { MealListQuery } from "Schema/types";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";

interface Props {
  onDelete: () => void;
  data?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

interface State {
  isDeleteModalOpen: boolean;
}

const MealListItem = ({ data, onDelete }: Props) => {
  const [state, setState] = useState<State>({
    isDeleteModalOpen: false,
  });

  const toggleDeleteModal = () => {
    setState({
      isDeleteModalOpen: !state.isDeleteModalOpen,
    });
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
            {data?.ingredients.map((ingredient, index) => {
              return (
                <li
                  key={`${ingredient.name}--${index}`}
                  className={style.mealListItemIngredientsItem}
                >
                  {ingredient.name}
                </li>
              );
            })}
          </ol>
        </li>
      </Box>
      <DeleteMealModal
        id={data?.id}
        onChange={onDelete}
        isOpen={state.isDeleteModalOpen}
        onClose={toggleDeleteModal}
      />
    </>
  );
};

export default MealListItem;
