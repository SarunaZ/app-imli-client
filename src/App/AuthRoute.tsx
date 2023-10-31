import React from "react";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_LOGIN_PAGE } from "./constants";
import Layout from "HOC/withLayout";

interface Props {
  children?: React.ReactNode;
}

const AuthRoute = ({ children }: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (isLoggedIn) {
    return <Layout>{children}</Layout>;
  }

  return <Navigate to={ROUTE_LOGIN_PAGE} />;
};

export default AuthRoute;
