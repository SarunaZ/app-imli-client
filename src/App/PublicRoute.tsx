import Loader from 'Components/Loader';
import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { Suspense, useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { ROUTE_ROOT } from './constants';

interface Props extends RouteProps {
  redirect?: string;
}

export const PublicRoute = ({
  redirect,
  ...rest
}: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  return (
    <Suspense fallback={<Loader />}>
      {isLoggedIn && <Redirect to={ROUTE_ROOT} />}
      {!isLoggedIn && <Route {...rest} />}
    </Suspense>
  )
};
