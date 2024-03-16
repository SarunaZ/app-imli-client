import useState from "Hooks/useState";
import { setCookies } from "Utilities/cookieParser";
import { createContext, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Theme } from "./types";
import { storedTheme } from "./utility";

interface State {
  currentTheme: Theme;
}

interface Props {
  children: ReactNode;
}

interface ContextState {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const defaultState: ContextState = {
  currentTheme: Theme.Light,
  setCurrentTheme: () => null,
};

export const ThemeProvider = createContext(defaultState);

const ThemeSwitcher = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    currentTheme: storedTheme,
  });

  const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setState({ currentTheme: theme });
  };

  const providerValue = {
    currentTheme: state.currentTheme,
    setCurrentTheme: setTheme,
  };

  return (
    <ThemeProvider.Provider value={providerValue}>
      <Helmet>
        <html data-theme={state.currentTheme} />
      </Helmet>
      {children}
    </ThemeProvider.Provider>
  );
};

export default ThemeSwitcher;
