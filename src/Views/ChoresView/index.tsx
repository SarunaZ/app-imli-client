import { Helmet } from "react-helmet-async";
import style from "./style.scss";

const ChoresListView = () => {
  return (
    <>
      <Helmet title={"Chores list | Imli"} />
      <section className={style.choresListWrapper}>
        <h2 className={style.choresListTitle}>Chores list</h2>
      </section>
    </>
  );
};

export default ChoresListView;
