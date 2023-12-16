import { useContext } from "react";
import style from "./style.scss";
import Logout from "Components/Sidebar/Logout";
import { Theme, ThemeProvider } from "Providers/ThemeProvider";

const SidebarFooter = () => {
  const { setCurrentTheme } = useContext(ThemeProvider);

  const handleSetTheme = () => {
    setCurrentTheme(Theme.Dark);
  };

  return (
    <div className={style.sidebarFooter}>
      <button onClick={handleSetTheme}>Dark theme</button>
      <Logout />
    </div>
  );
};

export default SidebarFooter;
