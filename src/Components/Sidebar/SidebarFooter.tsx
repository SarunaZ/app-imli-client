import style from "./style.scss";
import Logout from "Components/Sidebar/Logout";
import { useTheme } from "Providers/ThemeProvider";
import { Theme } from "Providers/ThemeProvider/types";

const SidebarFooter = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  const currentThemeTitle =
    currentTheme === Theme.Light ? Theme.Dark : Theme.Light;

  const handleSetTheme = () => {
    const currentThemeValue =
      currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
    console.log(currentThemeValue, "currentThemeValue");

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
