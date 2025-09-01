import Box from "Components/Box";
import style from "./style.scss";
import DeleteChoreModal from "Views/ChoresView/DeleteChoreModal";
import Delete from "Images/icons/delete.svg";
import Edit from "Images/icons/edit.svg";
import useState from "Hooks/useState";
import { ChoreListQuery } from "Schema/types";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import Dropdown from "Components/Dropdown";
import Button from "Components/Button";
import { SyntheticEvent } from "react";

interface Props {
  onEdit: (id: string) => void;
  onDelete: () => void;
  data?: DeepExtractTypeSkipArrays<ChoreListQuery, ["chores"]>;
}

interface State {
  isDeleteModalOpen: boolean;
}

const ChoreListItem = ({ data, onDelete, onEdit }: Props) => {
  const [state, setState] = useState<State>({
    isDeleteModalOpen: false,
  });

  const toggleDeleteModal = () => {
    setState({
      isDeleteModalOpen: !state.isDeleteModalOpen,
    });
  };

  const handleOnEdit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(data.id);
  };

  const formatTimestamp = (timestamp?: string | null) => {
    if (!timestamp) return "No timestamp";
    const timestampNum = parseInt(timestamp, 10);
    if (isNaN(timestampNum)) return "Invalid timestamp";
    return new Date(timestampNum).toLocaleDateString();
  };

  return (
    <>
      <li className={style.choreListItem}>
        <div className={style.choreListItemButton}>
          <Box
            as="div"
            title={data?.name}
            dropdownComponent={
              <Dropdown>
                <Button
                  buttonStyle="none"
                  onMouseDown={handleOnEdit}
                  className={style.choreListItemOption}
                >
                  {"Edit"}
                  <Edit height="16px" />
                </Button>
                <Button
                  buttonStyle="none"
                  onClick={toggleDeleteModal}
                  className={style.choreListItemOption}
                >
                  {"Delete"}
                  <Delete height="16px" />
                </Button>
              </Dropdown>
            }
          >
            <div className={style.choreListItemContent}>
              <h3 className={style.choreListItemName}>{data?.name}</h3>
              <p className={style.choreListItemTimestamp}>
                Created: {formatTimestamp(data?.timestamp)}
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
