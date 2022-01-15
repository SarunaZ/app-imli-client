import Sidebar from 'Components/Sidebar';
import style from './style.module.scss';

interface Props {
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

export default Layout;