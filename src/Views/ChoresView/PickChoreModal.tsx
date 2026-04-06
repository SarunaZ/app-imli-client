import withModal, { ModalProps } from "HOC/withModal";
import Button from "Components/Button";
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

const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

const PickChoreModal = ({ chores, onTaken }: Props) => {
  const [state, setState] = useState<State>({ selectedChore: null });
  const [takeChore, takeChoreData] = useMutation(CHORE_TAKE_MUTATION);
  const availableChores = useMemo(() => chores || [], [chores]);

  useEffect(() => {
    if (availableChores.length) {
      setState({ selectedChore: availableChores[getRandomIndex(availableChores.length)] });
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
      const currentIndex = availableChores.findIndex((c) => c.id === state.selectedChore?.id);
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
    <div className="flex min-h-[35dvh] w-full max-w-lg flex-col justify-evenly gap-5 p-5 sm:w-[550px]">
      <p className="mt-auto text-center text-4xl font-bold leading-tight text-text">
        {toSentenceCase(state.selectedChore?.name) || "No chores available"}
      </p>
      <div className="mt-auto flex justify-center gap-3">
        <Button buttonStyle="hollow" onClick={handlePass} className="min-w-[80px] flex-1">
          Pass
        </Button>
        <Button onClick={handleTake} isLoading={takeChoreData.loading} className="min-w-[80px] flex-1">
          Take
        </Button>
      </div>
    </div>
  );
};

export default withModal(PickChoreModal);
