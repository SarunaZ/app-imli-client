import React from "react";
import classnames from "classnames";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./style.scss";
import { Routes } from "./types";
import {
  getSanitizedPathname,
  isSamePathNameInRoutes,
} from "./utils";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  icon: React.ReactNode;
  routes: Routes[];
  defaultPath: string;
}

const SidebarItem = ({
  icon,
  title,
  routes = [],
  defaultPath,
}: Props) => {
  const navigate = useNavigate();
  const isSameRoute = isSamePathNameInRoutes(
    routes,
    getSanitizedPathname(location.pathname),
  );
  const [isShowItems, setShowItems] = useState<boolean>(isSameRoute);

  const handleToggle = () => {
    navigate(defaultPath);
    setShowItems((prevValue) => !prevValue);
  };

  return (
    <div className={style.sidebarItem}>
      <div className={style.sidebarItemTitle}>
        <h3>{title}</h3>
        <button
          onClick={handleToggle}
          className={style.sidebarItemToggle}
        >
          {icon}
        </button>
      </div>
      {isShowItems && isSamePathNameInRoutes && (
        <div className={style.sidebarLinkList}>
          {routes.map((route) => (
            <NavLink
              key={route.name}
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
