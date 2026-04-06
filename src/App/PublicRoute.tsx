import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { ReactElement, Suspense, useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_ROOT } from "./constants";

interface Props {
  children: ReactElement;
}

export default function PublicRoute({ children }: Props) {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (!isLoggedIn) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
  }

  return <Navigate to={ROUTE_ROOT} />;
};
