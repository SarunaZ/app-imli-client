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
import React from "react";
import MealPreviewModal from "Views/MealView/MealPreviewModal";

interface Props {
  onEdit: (id: string) => void;
  onDelete: () => void;
  data?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

interface State {
  isPreviewOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
}

const MealListItem = ({ data, onDelete, onEdit }: Props) => {
  const [state, setState] = useState<State>({
    isPreviewOpen: false,
    isDeleteModalOpen: false,
    isEditModalOpen: false,
  });

  const toggleDeleteModal = () => {
    setState({
      isDeleteModalOpen: !state.isDeleteModalOpen,
    });
  };

  const handleOnEdit = () => {
    onEdit(data.id);
  };

  const handlePreviewClick = () => {
    setState((prevState) => ({ isPreviewOpen: !prevState.isPreviewOpen }));
  };

  return (
    <>
      <li className={style.mealListItem}>
        <Button
          buttonStyle="none"
          className={style.mealListItemButton}
          onClick={handlePreviewClick}
        >
          <Box
            title={data?.name}
            dropdownComponent={
              <Dropdown>
                <Button
                  buttonStyle="none"
                  onClick={handleOnEdit}
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
            <ol className={style.mealListItemIngredients}>
              {data?.ingredients?.map((ingredient, index) => {
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
          </Box>
        </Button>
      </li>
      <DeleteMealModal
        id={data?.id}
        onChange={onDelete}
        onClose={toggleDeleteModal}
        isOpen={state.isDeleteModalOpen}
      />
      <MealPreviewModal
        title={data.name}
        mealData={data}
        modalWrapperClassName={style.mealPreviewModal}
        onClose={handlePreviewClick}
        isOpen={state.isPreviewOpen}
      />
    </>
  );
};

export default MealListItem;
