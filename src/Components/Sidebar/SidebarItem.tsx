import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import style from './style.module.scss';
import { Routes } from './types';
import { getSanitizedPathname, isSamePathNameInRoutes } from './utils';

interface Props {
  title: string;
  icon: React.ReactNode;
  routes: Routes[];
  defaultPath: string;
}

const SidebarItem = ({ icon, title, routes = [], defaultPath }: Props) => {
  const { location, push } = useHistory();
  const isSameRoute =
    isSamePathNameInRoutes(routes, getSanitizedPathname(location.pathname));
  const [isShowItems, setShowItems] = useState<boolean>(isSameRoute);

  const handleToggle = () => {
    push(defaultPath);
    setShowItems(prevValue => !prevValue);
  };

  return (
    <div className={style.sidebarItem}>
      <div
        className={style.sidebarItemTitle}
      >
        <h3>{title}</h3>
        <button
          onClick={handleToggle}
          className={style.sidebarItemToggle}
        >
          {icon}
        </button>
      </div>
      {(isShowItems && isSamePathNameInRoutes) && (
        <div className={style.sidebarLinkList}>
          {routes.map((route) => (
            <NavLink
              activeClassName={style.activeLink}
              key={route.name}
              to={route.pathname}
              className={style.sidebarLink}
            >
              {route.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
