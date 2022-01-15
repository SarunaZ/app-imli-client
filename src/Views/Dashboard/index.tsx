import {useState} from "react";

interface Props {}
interface State {}
const Dashboard = ({}: Props) => {
  const [state, setState] = useState<State>({});
  return (
    <h1>
      Hello Everybody
    </h1>
  );
};

export default Dashboard;
