import { Helmet } from "react-helmet-async";
import style from "./style.scss";
import { CHORE_LIST_DATA } from "Schema/queries/chore.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import useQuery from "Hooks/useQuery";
import Add from "Images/icons/add.svg";
import Dice from "Images/icons/dice.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ChoreListItem from "Views/ChoresView/ChoreListItem";
import useState from "Hooks/useState";
import PickChoreModal from "Views/ChoresView/PickChoreModal";
import { useLazyQuery } from "@apollo/client";

const ChoresListView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState<{ isPickOpen: boolean }>({
    isPickOpen: false,
  });

  const { loading, error, data, refetch } = useQuery(CHORE_LIST_DATA, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const [fetchPickChores, pickQuery] = useLazyQuery(CHORE_LIST_DATA, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  const handleAddChore = () => {
    navigate("/chores/create");
  };

  const handleOnEdit = (choreId: string) => {
    navigate(`/chores/edit/${choreId}`);
  };

  const handleOpenPick = async () => {
    // Fetch chores for picking with cooldown filter without affecting the main list
    await fetchPickChores({ variables: { days: 5 } });
    setState({ isPickOpen: true });
  };
  const handleClosePick = () => setState({ isPickOpen: false });
  const handleTaken = () => {
    handleClosePick();
    // Return to the default unfiltered list
    refetch();
  };

  return (
    <>
      <Helmet title={"Chores list | Imli"} />
      <section className={style.choresListWrapper}>
        <div className={style.choresListHeader}>
          <h2 className={style.choresListTitle}>Chores list</h2>
        </div>
        {!loading && (!data?.chores || !data?.chores?.length) && (
          <p>No data found</p>
        )}
        <ul className={style.choresList}>
          {data.chores?.map((chore) => (
            <ChoreListItem
              data={chore}
              key={chore.id}
              onDelete={refetch}
              onEdit={handleOnEdit}
            />
          ))}
        </ul>
        <div className={style.choresActions}>
          <button
            className={style.choresListAddButton}
            onClick={handleAddChore}
          >
            <Add className={style.choresListAddIcon} />
          </button>
          <button
            className={style.pickChoreButton}
            onClick={handleOpenPick}
            aria-label="Pick random chore"
          >
            <Dice className={style.pickChoreIcon} />
          </button>
        </div>
      </section>
      <PickChoreModal
        isOpen={state.isPickOpen}
        onClose={handleClosePick}
        title="Is this your chore?"
        chores={pickQuery.data?.chores || []}
        onTaken={handleTaken}
      />
    </>
  );
};

export default ChoresListView;
