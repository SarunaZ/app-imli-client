import React from "react";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_ROOT } from "./constants";

interface Props {
  children?: JSX.Element;
}

export const PublicRoute = ({
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (!isLoggedIn) {
    return children;
  }

  return <Navigate to={ROUTE_ROOT} />;
};
