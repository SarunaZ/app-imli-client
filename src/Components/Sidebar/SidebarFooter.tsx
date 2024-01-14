import { useContext } from "react";
import style from "./style.scss";
import Logout from "Components/Sidebar/Logout";
import { Theme, ThemeProvider } from "Providers/ThemeProvider";

const SidebarFooter = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeProvider);

  const handleSetTheme = () => {
    currentTheme === Theme.Light
      ? setCurrentTheme(Theme.Dark)
      : setCurrentTheme(Theme.Light);
  };

  const themeTitle = currentTheme === Theme.Dark ? "Dark" : "Light";

  return (
    <div className={style.sidebarFooter}>
      <Logout />
      <button className={style.themeName} onClick={handleSetTheme}>
        {themeTitle}
      </button>
    </div>
  );
};

export default SidebarFooter;
