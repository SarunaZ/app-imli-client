import Loader from 'Components/Loader';
import Sidebar from 'Components/Sidebar';
import { Suspense } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './style.module.scss';

export default function withLayout<P>(Component: React.ComponentType<P & RouteComponentProps<any>>) {
  const WithLayoutComponent = (props: P & RouteComponentProps<any>) => {
    return (
      <>
        <Sidebar />
        <Suspense
          fallback={<Loader />}>
          <div className={style.mainContent}>
            <Component {...props} />
          </div>
        </Suspense>
      </>
    )
  }

  return withRouter(WithLayoutComponent);
}
