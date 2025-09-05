import withModal, { ModalProps } from "HOC/withModal";
import Button from "Components/Button";
import style from "./style.scss";
import useState from "Hooks/useState";
import { useEffect, useMemo } from "react";
import useMutation from "Hooks/useMutation";
import { CHORE_TAKE_MUTATION } from "Schema/mutations/chore.mutations";
import { toSentenceCase } from "Utilities/sentenceCase";

interface ChoreItem {
  id: string;
  name?: string | null;
}

interface Props extends ModalProps {
  chores: ChoreItem[];
  onTaken: () => void;
}

interface State {
  selectedChore?: ChoreItem | null;
}

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * max);
};

const PickChoreModal = ({ chores, onTaken }: Props) => {
  const [state, setState] = useState<State>({ selectedChore: null });
  const [takeChore, takeChoreData] = useMutation(CHORE_TAKE_MUTATION);

  const availableChores = useMemo(() => chores || [], [chores]);

  useEffect(() => {
    if (availableChores.length) {
      const idx = getRandomIndex(availableChores.length);
      setState({ selectedChore: availableChores[idx] });
    } else {
      setState({ selectedChore: null });
    }
  }, [availableChores]);

  const handlePass = () => {
    if (!availableChores.length) return;
    if (availableChores.length === 1) {
      setState({ selectedChore: availableChores[0] });
      return;
    }

    let nextIndex = getRandomIndex(availableChores.length);
    if (state.selectedChore) {
      // avoid repeating the same selection if possible
      const currentIndex = availableChores.findIndex(
        (c) => c.id === state.selectedChore?.id,
      );
      if (currentIndex !== -1 && nextIndex === currentIndex) {
        nextIndex = (nextIndex + 1) % availableChores.length;
      }
    }
    setState({ selectedChore: availableChores[nextIndex] });
  };

  const handleTake = () => {
    if (!state.selectedChore) return;
    takeChore({
      variables: { id: state.selectedChore.id },
      update: () => onTaken(),
    });
  };

  return (
    <div className={style.pickChoreModalContent}>
      <p className={style.pickChoreTitle}>
        {toSentenceCase(state.selectedChore?.name) || "No chores available"}
      </p>
      <div className={style.pickChoreModalButtons}>
        <Button
          buttonStyle="hollow"
          onClick={handlePass}
          className={style.pickChoreModalButton}
        >
          Pass
        </Button>
        <Button
          onClick={handleTake}
          isLoading={takeChoreData.loading}
          className={style.pickChoreModalButton}
        >
          Take
        </Button>
      </div>
    </div>
  );
};

export default withModal(PickChoreModal);
