import ErrorBoundary from 'Components/ErrorHandler/ErrorBoundary';
import Loader from 'Components/Loader';
import Sidebar from 'Components/Sidebar';
import { Suspense } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './style.module.scss';

export default function withLayout<P>
  (Component: React.ComponentType<P & RouteComponentProps<any>>) {
  const WithLayoutComponent = (props: P & RouteComponentProps<any>) => (
    <>
      <Sidebar />
      <Suspense
        fallback={<Loader />}>
        <main className={style.mainContent}>
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        </main>
      </Suspense>
    </>
  )

  return withRouter(WithLayoutComponent);
}
