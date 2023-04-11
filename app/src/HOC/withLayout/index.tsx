import React, { ReactNode, useContext } from 'react';
import ErrorBoundary from 'Components/ErrorHandler/ErrorBoundary';
import Loader from 'Components/Loader';
import Sidebar from 'Components/Sidebar';
import { Suspense } from 'react';
import style from './style.scss';
import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { Navigate } from 'react-router-dom';
import { ROUTE_LOGIN_PAGE } from 'App/constants';

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { isLoggedIn } = useContext(AuthenticationProvider);

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_LOGIN_PAGE} />
  }

  return (
    <>
      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
      <ErrorBoundary>
        <main className={style.mainContent}>
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </main>
      </ErrorBoundary>
    </>
  )
}

export default Layout;