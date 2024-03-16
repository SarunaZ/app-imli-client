import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_ROOT } from "./constants";

interface Props {
  children: ReactElement;
}

export const PublicRoute = ({ children }: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (!isLoggedIn) {
    return children;
  }

  return <Navigate to={ROUTE_ROOT} />;
};
