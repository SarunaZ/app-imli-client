import { createContext } from "react";

export interface UserLoginData {
  username?: string;
  password?: string;
}

interface State {
  logout: () => void;
  isLoggedIn: boolean | null | string;
  isLoading: boolean;
  error?: { [variables: string]: any } | string | Error | null;
  username?: string;
  login: (userData: UserLoginData) => void;
}

const defaultState: State = {
  username: undefined,
  error: undefined,
  isLoggedIn: false,
  isLoading: false,
  login: () => { },
  logout: () => { },
}

export const AuthenticationProvider = createContext(defaultState);
