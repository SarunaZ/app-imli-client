import React from "react";
import style from "./style.scss";
import { useQuery } from "@apollo/client";
import { DASHBOARD_DATA } from "Schema/queries/dashboardQueries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";

const Dashboard = () => {
  const { loading, error, data = {} } = useQuery(DASHBOARD_DATA);

  if (loading) return <Loader />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      <h1 className={style.dashboardTitle}>
        Hello, {data.userDashboard?.username}
      </h1>
    </>
  );
};

export default Dashboard;
