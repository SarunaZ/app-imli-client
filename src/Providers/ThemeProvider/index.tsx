import useState from "Hooks/useState";
import { createContext } from "react";
import { Helmet } from "react-helmet-async";

export const enum Theme {
  Light = "LIGHT",
  Dark = "DARK",
}

interface State {
  currentTheme: Theme;
}

interface Props {
  children: React.ReactNode;
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

const ThemeSwither = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    currentTheme: Theme.Light,
  });

  const setTheme = (theme: Theme) => {
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

export default ThemeSwither;
