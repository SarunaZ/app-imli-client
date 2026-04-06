import Box from "Components/Box";
import DeleteChoreModal from "Views/ChoresView/DeleteChoreModal";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import useState from "Hooks/useState";
import { ChoreListQuery } from "Schema/types";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import Dropdown from "Components/Dropdown";
import Button from "Components/Button";
import { SyntheticEvent } from "react";
import { toSentenceCase } from "Utilities/sentenceCase";

interface Props {
  onEdit: (id: string) => void;
  onDelete: () => void;
  data?: DeepExtractTypeSkipArrays<ChoreListQuery, ["chores"]>;
}

interface State {
  isDeleteModalOpen: boolean;
}

const ChoreListItem = ({ data, onDelete, onEdit }: Props) => {
  const [state, setState] = useState<State>({ isDeleteModalOpen: false });

  const toggleDeleteModal = () => {
    setState({ isDeleteModalOpen: !state.isDeleteModalOpen });
  };

  const handleOnEdit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(data.id);
  };

  return (
    <>
      <li className="min-h-[150px]">
        <div className="h-full w-full">
          <Box
            as="div"
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
            <div className="flex w-full flex-col gap-2.5">
              <p className="text-center text-xl text-text">
                {toSentenceCase(data.name)}
              </p>
            </div>
          </Box>
        </div>
      </li>
      <DeleteChoreModal
        id={data?.id}
        onChange={onDelete}
        onClose={toggleDeleteModal}
        isOpen={state.isDeleteModalOpen}
      />
    </>
  );
};

export default ChoreListItem;
