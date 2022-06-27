import { createContext } from "react";

export interface UserLoginData {
  username?: string;
  password?: string;
}

interface State {
  logout: () => void;
  isLoggedIn: boolean | undefined;
  isLoading: boolean;
  error?: { [variables: string]: any } | string | Error | null;
  login: (userData: UserLoginData) => void;
}

const defaultState: State = {
  error: undefined,
  isLoggedIn: false,
  isLoading: false,
  login: () => { },
  logout: () => { },
}

export const AuthenticationProvider = createContext(defaultState);
