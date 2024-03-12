import withModal, { ModalProps } from "HOC/withModal";
import { MEAL_DELETE } from "Schema/mutations/meal.mutations";
import Button from "Components/Button";
import style from "./style.scss";
import useMutation from "Hooks/useMutation";

interface Props extends ModalProps {
  id?: string;
  onChange: () => void;
}

const DeleteMealModal = ({ id, onChange }: Props) => {
  const [deleteProductM, deleteProductMData] = useMutation(MEAL_DELETE);

  const deleteProduct = () => {
    if (id) {
      deleteProductM({
        variables: {
          id,
        },
        update: () => onChange(),
      });
    }
  };

  return (
    <div>
      <h3>Do you want to delete this meal?</h3>
      <Button
        className={style.deleteModalButton}
        onClick={deleteProduct}
        isLoading={deleteProductMData.loading}
      >
        Delete
      </Button>
    </div>
  );
};

export default withModal(DeleteMealModal);
