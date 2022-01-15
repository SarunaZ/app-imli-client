import Layout from "Components/Layout";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";
import {Route, RouteProps, Redirect} from "react-router-dom";
import {ROUTE_LOGIN_PAGE} from "./constants";

interface Props extends RouteProps {
  isPublic?: boolean;
  redirect?: string;
}

export const AuthRoute = ({
  isPublic,
  redirect,
   ...rest
 }: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (isLoggedIn) {
    return (
      <Layout>
        <Route {...rest} />
      </Layout>
    )
  }

  return <Redirect to={ROUTE_LOGIN_PAGE} />
};
