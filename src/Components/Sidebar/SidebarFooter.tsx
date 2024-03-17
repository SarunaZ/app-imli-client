import { useContext } from "react";
import style from "./style.scss";
import Logout from "Components/Sidebar/Logout";
import { ThemeProvider } from "Providers/ThemeProvider";
import { Theme } from "Providers/ThemeProvider/types";

const SidebarFooter = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeProvider);

  const currentThemeTitle =
    currentTheme === Theme.Light ? Theme.Dark : Theme.Light;

  const handleSetTheme = () => {
    const currentThemeValue =
      currentTheme === Theme.Light ? Theme.Dark : Theme.Light;

    setCurrentTheme(currentThemeValue);
  };

  return (
    <div className={style.sidebarFooter}>
      <Logout />
      <button className={style.themeName} onClick={handleSetTheme}>
        {currentThemeTitle}
      </button>
    </div>
  );
};

export default SidebarFooter;
