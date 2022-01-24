import Loader from 'Components/Loader';
import Sidebar from 'Components/Sidebar';
import { Suspense } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './style.module.scss';

export default function withLayout<P>(Component: React.ComponentType<P & RouteComponentProps<any>>) {
  const WithLayoutComponent = (props: P & RouteComponentProps<any>) => {
    return (
      <div className={style.layout}>
        <Sidebar />
        <Suspense
          fallback={<Loader />}>
          <div className={style.mainContent}>
            <Component {...props} />
          </div>
        </Suspense>
      </div>
    )
  }

  return withRouter(WithLayoutComponent);
}
