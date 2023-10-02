import React from "react";
import classnames from "classnames";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./style.scss";
import { Routes } from "./types";
import { getSanitizedPathname, isSamePathNameInRoutes } from "./utils";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  icon: React.ReactNode;
  routes: Routes[];
  defaultPath: string;
  onSelect: () => void;
}

interface State {
  isShowItems: boolean;
}

const SidebarItem = ({
  icon,
  title,
  routes = [],
  defaultPath,
  onSelect,
}: Props) => {
  const navigate = useNavigate();
  const isSameRoute = isSamePathNameInRoutes(
    routes,
    getSanitizedPathname(location.pathname),
  );
  const [state, setState] = useState<State>({ isShowItems: isSameRoute });

  const handleToggle = () => {
    navigate(defaultPath);
    setState({ isShowItems: !state.isShowItems });
    onSelect();
  };

  return (
    <div className={style.sidebarItem}>
      <div className={style.sidebarItemTitle}>
        <h3>{title}</h3>
        <button onClick={handleToggle} className={style.sidebarItemToggle}>
          {icon}
        </button>
      </div>
      {state.isShowItems && isSamePathNameInRoutes && (
        <div className={style.sidebarLinkList}>
          {routes.map((route) => (
            <NavLink
              key={route.name}
              onClick={onSelect}
              to={route.pathname}
              className={({ isActive }) =>
                classnames(style.sidebarLink, {
                  [style.activeLink]: isActive,
                })
              }
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
