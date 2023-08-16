import style from "./style.scss";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";
import classnames from "classnames";
import { useState } from "react";
import RightArrow from "Images/icons/arrow-right.svg";
import ErrorBoundary from "Components/ErrorHandler/ErrorBoundary";

const Sidebar = () => {
  const [isSidebarShow, setSidebarShow] = useState<boolean>(false);
  const toggleSiderbar = () => setSidebarShow((prev) => !prev);
  const sidebarClasses = classnames(style.sidebarWrapper, {
    [style.active]: isSidebarShow,
  });

  const siderbarToggleClasses = classnames(style.sidebarToggle, {
    [style.active]: isSidebarShow,
  });

  return (
    <aside className={sidebarClasses}>
      <div className={style.siderbar}>
        <ErrorBoundary>
          <SidebarContent onSelect={toggleSiderbar} />
          <SidebarFooter />
          <button className={siderbarToggleClasses} onClick={toggleSiderbar}>
            <RightArrow height="25px" />
          </button>
        </ErrorBoundary>
      </div>
    </aside>
  );
};

export default Sidebar;
