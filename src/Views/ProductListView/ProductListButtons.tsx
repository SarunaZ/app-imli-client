import MealAddIcon from "Images/icons/meal.svg";
import Cancel from "Images/icons/cancel.svg";
import MealDropdown from "./MealDropdown";
import ProductCancelModal from "./ProductCancelModal";
import useState from "Hooks/useState";

interface Props {
  onChange: () => void;
}

interface State {
  toggleMealModal: boolean;
  openCancelModal: boolean;
}

const ProductListButtons = ({ onChange }: Props) => {
  const [state, setState] = useState<State>({
    toggleMealModal: false,
    openCancelModal: false,
  });

  const handleModalToggle = () => {
    setState({ toggleMealModal: !state.toggleMealModal });
  };

  const handleCancelList = () => {
    setState({ openCancelModal: !state.openCancelModal });
  };

  const handleOnChangeCancel = () => {
    onChange();
    setState({ openCancelModal: false });
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 flex w-[50px] flex-col gap-3 md:bottom-12 md:right-12">
        <button onClick={handleModalToggle}>
          <MealAddIcon className="h-[50px] w-[50px] rounded-full bg-text-inv shadow-lg [&_path]:fill-secondary" />
        </button>
        <button onClick={handleCancelList}>
          <Cancel className="h-[50px] w-[50px] rounded-full bg-text-inv shadow-lg [&_path]:fill-secondary" />
        </button>
      </div>
      <MealDropdown
        onUpdate={onChange}
        title="Please select meal"
        isOpen={state.toggleMealModal}
        onClose={handleModalToggle}
      />
      <ProductCancelModal
        title="Complete product list?"
        isOpen={state.openCancelModal}
        onClose={handleCancelList}
        onChange={handleOnChangeCancel}
      />
    </>
  );
};

export default ProductListButtons;
