import style from './style.module.scss';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';
import classnames from 'classnames';
import { useState } from 'react';
import { ReactComponent as RightArrow } from 'Images/icons/arrow-right.svg';

const Sidebar = () => {
  const [isSidebarShow, setSidebarShow] = useState < boolean >(false);
  const toggleSiderbar = () => setSidebarShow(prev => !prev);
  const sidebarClasses = classnames(style.sidebarWrapper, {
    [style.active]: isSidebarShow
  });
  const siderbarToggleClasses = classnames(style.sidebarToggle, {
    [style.active]: isSidebarShow
  });

  return (
    <aside className={sidebarClasses}>
      <div className={style.siderbar}>
        <SidebarContent />
        <SidebarFooter />
        <button
          className={siderbarToggleClasses}
          onClick={toggleSiderbar}
        >
          <RightArrow height="25px" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
