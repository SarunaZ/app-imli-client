import style from './style.module.scss';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => (
  <aside className={style.sidebarWrapper}>
    <SidebarContent />
    <SidebarFooter />
  </aside>
);

export default Sidebar;