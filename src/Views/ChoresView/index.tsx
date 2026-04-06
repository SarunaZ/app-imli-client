import { Helmet } from "react-helmet-async";
import { CHORE_LIST_DATA } from "Schema/queries/chore.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import useQuery from "Hooks/useQuery";
import Add from "Images/icons/add.svg";
import Dice from "Images/icons/dice.svg";
import { useNavigate } from "react-router-dom";
import ChoreListItem from "Views/ChoresView/ChoreListItem";
import useState from "Hooks/useState";
import PickChoreModal from "Views/ChoresView/PickChoreModal";
import { useLazyQuery } from "@apollo/client";

const ChoresListView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{ isPickOpen: boolean }>({ isPickOpen: false });

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

  const handleOpenPick = async () => {
    await fetchPickChores({ variables: { days: 5 } });
    setState({ isPickOpen: true });
  };

  const handleTaken = () => {
    setState({ isPickOpen: false });
    refetch();
  };

  return (
    <>
      <Helmet title={"Chores list | Imli"} />
      <section className="mx-auto max-w-6xl text-text">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-text">Chores list</h2>
        </div>

        {!loading && (!data?.chores || !data?.chores?.length) && (
          <p className="text-text-muted">No data found</p>
        )}

        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 md:grid-cols-3">
          {data.chores?.map((chore) => (
            <ChoreListItem
              data={chore}
              key={chore.id}
              onDelete={refetch}
              onEdit={(choreId) => navigate(`/chores/edit/${choreId}`)}
            />
          ))}
        </ul>

        <div className="fixed bottom-5 right-5 flex flex-col items-center gap-3 md:bottom-12 md:right-12">
          <button
            className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg transition-transform hover:scale-110"
            onClick={() => navigate("/chores/create")}
          >
            <Add className="h-7 w-7 text-text-inv" />
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-text-inv shadow-lg transition-transform hover:scale-110"
            onClick={handleOpenPick}
            aria-label="Pick random chore"
          >
            <Dice className="h-6 w-6 [&_path]:fill-secondary" />
          </button>
        </div>
      </section>
      <PickChoreModal
        isOpen={state.isPickOpen}
        onClose={() => setState({ isPickOpen: false })}
        title="Is this your chore?"
        chores={pickQuery.data?.chores || []}
        onTaken={handleTaken}
      />
    </>
  );
};

export default ChoresListView;
