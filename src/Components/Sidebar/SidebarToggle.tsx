import style from './style.module.scss';
import Logout from 'Components/Logout';


const SidebarFooter = () => {
  return (
    <div className={style.sidebarFooter}>
      <Logout />
    </div>
  );
}

export default SidebarFooter;