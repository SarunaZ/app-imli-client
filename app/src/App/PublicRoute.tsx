import React from 'react';
import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ROUTE_ROOT } from './constants';

interface Props {
  redirect?: string;
}

export const PublicRoute = ({
  redirect,
  ...rest
}: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (!isLoggedIn) {
    return <Route {...rest} />
  }

  return <Navigate to={ROUTE_ROOT} />
};
