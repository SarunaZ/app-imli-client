import React from "react";
import style from "./style.scss";
import Logout from "Components/Sidebar/Logout";

const SidebarFooter = () => {
  return (
    <div className={style.sidebarFooter}>
      <Logout />
    </div>
  );
};

export default SidebarFooter;
