import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { ROUTE_ROOT } from "./constants";

interface Props extends RouteProps {
  redirect?: string;
}

export const PublicRoute = ({
  redirect,
   ...rest
 }: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (isLoggedIn) {
    return <Redirect to={ROUTE_ROOT} />
  }

  return <Route {...rest} />
};
