import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";

const Dashboard = () => {
  const { username } = useContext(AuthenticationProvider);
  
  return (
    <h1>
      Hello, {username}
    </h1>
  );
};

export default Dashboard;
