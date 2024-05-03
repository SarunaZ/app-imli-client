import Box from "Components/Box";
import style from "./style.scss";
import DeleteMealModal from "./DeleteMealModal";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import useState from "Hooks/useState";
import { MealListQuery } from "Schema/types";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import Dropdown from "Components/Dropdown";
import Button from "Components/Button";
import AddMealModal from "Views/MealView/AddMealModal";
import React from "react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  data?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

interface State {
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
}

const MealListItem = ({ data, onDelete, onEdit }: Props) => {
  const [state, setState] = useState<State>({
    isDeleteModalOpen: false,
    isEditModalOpen: false,
  });

  const toggleDeleteModal = () => {
    setState({
      isDeleteModalOpen: !state.isDeleteModalOpen,
    });
  };

  const toggleEditModal = () => {
    setState({
      isEditModalOpen: !state.isEditModalOpen,
    });
  };

  return (
    <>
      <Box
        title={data?.name}
        dropdownComponent={
          <Dropdown>
            <Button
              buttonStyle="none"
              onClick={toggleEditModal}
              className={style.mealListItemOption}
            >
              {"Edit"}
              <Edit height="16px" />
            </Button>
            <Button
              buttonStyle="none"
              onClick={toggleDeleteModal}
              className={style.mealListItemOption}
            >
              {"Delete"}
              <Delete height="16px" />
            </Button>
          </Dropdown>
        }
      >
        <li className={style.mealListItem}>
          <div className={style.mealListItemHeader}></div>
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
      <AddMealModal
        isEdit
        mealData={data}
        onChange={onEdit}
        onClose={toggleEditModal}
        title={`Edit ${data?.name}`}
        isOpen={state.isEditModalOpen}
      />
      <DeleteMealModal
        id={data?.id}
        onChange={onDelete}
        onClose={toggleDeleteModal}
        isOpen={state.isDeleteModalOpen}
      />
    </>
  );
};

export default MealListItem;
