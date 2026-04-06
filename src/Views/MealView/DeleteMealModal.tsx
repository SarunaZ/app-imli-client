import withModal, { ModalProps } from "HOC/withModal";
import { MEAL_DELETE } from "Schema/mutations/meal.mutations";
import Button from "Components/Button";
import useMutation from "Hooks/useMutation";

interface Props extends ModalProps {
  id?: string;
  onChange: () => void;
}

const DeleteMealModal = ({ id, onChange }: Props) => {
  const [deleteMeal, deleteMealData] = useMutation(MEAL_DELETE);

  const handleDelete = () => {
    if (id) {
      deleteMeal({
        variables: { id },
        update: () => onChange(),
      });
    }
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-text">
        Do you want to delete this meal?
      </h3>
      <Button
        className="w-full"
        onClick={handleDelete}
        isLoading={deleteMealData.loading}
      >
        Delete
      </Button>
    </div>
  );
};

export default withModal(DeleteMealModal);
