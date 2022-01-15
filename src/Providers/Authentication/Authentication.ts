import { createContext } from "react";

export interface UserLoginData {
  username?: string;
  password?: string;
}

interface State {
  logout: () => void;
  isLoggedIn: boolean | null | string;
  login: (userData: UserLoginData) => void;
}

const defaultState: State = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
}

export const AuthenticationProvider = createContext(defaultState);
