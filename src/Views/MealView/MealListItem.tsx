import Box from "Components/Box";
import DeleteMealModal from "./DeleteMealModal";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import useState from "Hooks/useState";
import { MealListQuery } from "Schema/types";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import Dropdown from "Components/Dropdown";
import Button from "Components/Button";
import { SyntheticEvent } from "react";
import MealPreviewModal from "Views/MealView/MealPreviewModal";

interface Props {
  onEdit: (id: string) => void;
  onDelete: () => void;
  data?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

interface State {
  isPreviewOpen: boolean;
  isDeleteModalOpen: boolean;
}

const MealListItem = ({ data, onDelete, onEdit }: Props) => {
  const [state, setState] = useState<State>({
    isPreviewOpen: false,
    isDeleteModalOpen: false,
  });

  const toggleDeleteModal = () => {
    setState({ isDeleteModalOpen: !state.isDeleteModalOpen });
  };

  const handleOnEdit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(data.id);
  };

  const handlePreviewClick = (e?: SyntheticEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    setState((prev) => ({ isPreviewOpen: !prev.isPreviewOpen }));
  };

  return (
    <>
      <li className="min-h-[200px] cursor-pointer">
        <div role="button" onClick={handlePreviewClick} className="h-full w-full">
          <Box
            as="div"
            title={data?.name}
            dropdownComponent={
              <Dropdown>
                <Button
                  buttonStyle="none"
                  onMouseDown={handleOnEdit}
                  className="flex w-full items-center justify-between text-text"
                >
                  Edit
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  buttonStyle="none"
                  onClick={toggleDeleteModal}
                  className="flex w-full items-center justify-between text-text"
                >
                  Delete
                  <Delete className="h-4 w-4" />
                </Button>
              </Dropdown>
            }
          >
            <ol className="mt-3 list-decimal space-y-1 pl-6 text-sm capitalize text-text">
              {data?.ingredients?.map((ingredient, index) => (
                <li key={`${ingredient.name}--${index}`}>{ingredient.name}</li>
              ))}
            </ol>
          </Box>
        </div>
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
        modalWrapperClassName="max-sm:items-stretch"
        onClose={handlePreviewClick}
        isOpen={state.isPreviewOpen}
      />
    </>
  );
};

export default MealListItem;
