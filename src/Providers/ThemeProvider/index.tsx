import useState from "Hooks/useState";
import { createContext, ReactNode, useContext, useEffect } from "react";
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

    document.querySelector("html").setAttribute("data-theme", theme);

    setState({ currentTheme: theme });
  };

  const providerValue = {
    currentTheme: state.currentTheme,
    setCurrentTheme: setTheme,
  };

  useEffect(() => {
    try {
      document
        .querySelector("html")
        .setAttribute("data-theme", state.currentTheme);
    } catch {
      console.log("Error setting error");
    }
  }, []);

  return (
    <ThemeProvider.Provider value={providerValue}>
      {children}
    </ThemeProvider.Provider>
  );
};

export const useTheme = () => useContext(ThemeProvider);
export default ThemeSwitcher;
