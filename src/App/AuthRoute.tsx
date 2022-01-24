import withLayout from 'HOC/withLayout';
import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { ROUTE_LOGIN_PAGE } from './constants';

interface Props extends RouteProps {
  isPublic?: boolean;
  redirect?: string;
}

const AuthRoute = ({
  isPublic,
  redirect,
  ...rest
}: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (isLoggedIn) {
    return (
      <Route {...rest} />
    );
  }

  return <Redirect to={ROUTE_LOGIN_PAGE} />;
};

export default withLayout(AuthRoute);