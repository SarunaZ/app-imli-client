import withModal, { ModalProps } from "HOC/withModal";
import Button from "Components/Button";
import useMutation from "Hooks/useMutation";
import { CHORE_DELETE_MUTATION } from "Schema/mutations/chore.mutations";

interface Props extends ModalProps {
  id?: string;
  onChange: () => void;
}

const DeleteChoreModal = ({ id, onChange }: Props) => {
  const [deleteChore, deleteChoreData] = useMutation(CHORE_DELETE_MUTATION);

  const handleDelete = () => {
    if (id) {
      deleteChore({
        variables: { id },
        update: () => onChange(),
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <h3 className="text-lg font-semibold text-text">Delete Chore</h3>
      <p className="text-sm text-text">Are you sure you want to delete this chore?</p>
      <div className="flex justify-end gap-3">
        <Button
          buttonStyle="hollow"
          onClick={handleDelete}
          isLoading={deleteChoreData.loading}
          className="min-w-[80px]"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default withModal(DeleteChoreModal);
