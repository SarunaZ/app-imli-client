import withModal, { ModalProps } from "HOC/withModal";
import Button from "Components/Button";
import useMutation from "Hooks/useMutation";
import { CHORE_DELETE_MUTATION } from "Schema/mutations/chore.mutations";
import style from "./style.scss";

interface Props extends ModalProps {
  id?: string;
  onChange: () => void;
}

const DeleteChoreModal = ({ id, onChange }: Props) => {
  const [deleteChore, deleteChoreData] = useMutation(CHORE_DELETE_MUTATION);

  const handleDelete = () => {
    if (id) {
      deleteChore({
        variables: {
          id,
        },
        update: () => onChange(),
      });
    }
  };

  return (
    <div className={style.deleteModalContent}>
      <h3 className={style.deleteModalTitle}>Delete Chore</h3>
      <p>Are you sure you want to delete this chore?</p>
      <div className={style.deleteModalButtons}>
        <Button
          buttonStyle="hollow"
          onClick={handleDelete}
          isLoading={deleteChoreData.loading}
          className={style.deleteModalButton}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default withModal(DeleteChoreModal);
