import { DASHBOARD_DATA } from "Schema/queries/dashboard.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import { useQuery } from "@apollo/client/react/hooks/useQuery";

const Dashboard = () => {
  const { loading, error, data = {} } = useQuery(DASHBOARD_DATA);

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <div className="flex items-center justify-center py-16">
      <h1 className="text-3xl font-bold text-text">
        Hello, {data.userDashboard?.username}
      </h1>
    </div>
  );
};

export default Dashboard;
