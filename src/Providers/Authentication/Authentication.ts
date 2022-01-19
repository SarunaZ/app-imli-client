import { createContext } from "react";

export interface UserLoginData {
  username?: string;
  password?: string;
}

interface State {
  logout: () => void;
  isLoggedIn: boolean | null | string;
  isLoading: boolean;
  username?: string;
  login: (userData: UserLoginData) => void;
}

const defaultState: State = {
  username: undefined,
  isLoggedIn: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
}

export const AuthenticationProvider = createContext(defaultState);
