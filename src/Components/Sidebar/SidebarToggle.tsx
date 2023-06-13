import React from "react";
import style from "./style.scss";
import Logout from "Providers/Authentication/Logout";

const SidebarFooter = () => {
  return (
    <div className={style.sidebarFooter}>
      <Logout />
    </div>
  );
};

export default SidebarFooter;
