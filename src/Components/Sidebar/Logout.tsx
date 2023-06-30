import React from "react";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import { useContext } from "react";
import style from "./style.scss";

const Logout = () => {
  const { logout } = useContext(AuthenticationProvider);

  return (
    <button className={style.logout} onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
