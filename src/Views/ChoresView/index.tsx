import { Helmet } from "react-helmet-async";
import style from "./style.scss";
import { CHORE_LIST_DATA } from "Schema/queries/chore.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import useQuery from "Hooks/useQuery";
import Add from "Images/icons/add.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ChoreListItem from "Views/ChoresView/ChoreListItem";

const ChoresListView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(CHORE_LIST_DATA, {
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
        <button className={style.choresListAddButton} onClick={handleAddChore}>
          <Add className={style.choresListAddIcon} />
        </button>
      </section>
    </>
  );
};

export default ChoresListView;
