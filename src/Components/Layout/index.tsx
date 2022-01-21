import Sidebar from 'Components/Sidebar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './style.module.scss';

interface Props extends RouteComponentProps<any> {
  children: React.ReactChild;
}

const Layout = ({children}: Props) => (
  <div className={style.layout}>
    <Sidebar />
    <div className={style.mainContent}>
      {children}
    </div>
  </div>
)

export default withRouter(Layout);