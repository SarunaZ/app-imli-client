import React from "react";
import {
  deleteCookie,
  getCookieData,
  setCookies,
} from "Utilities/cookieParser";
import { AuthenticationProvider, UserLoginData } from "./Authentication";
import useFetch from "Hooks/useFetch";
import useState from "Hooks/useState";

interface Props {
  children?: React.ReactNode;
}

interface State {
  auth?: boolean;
}

const AUTH_COOKIE = "auth";

const Authentication = ({ children }: Props) => {
  const Auth = !!getCookieData(AUTH_COOKIE) || undefined;

  const [state, setState] = useState<State>({
    auth: Auth,
  });
  const [submitLoginFetch, { isLoading, error }] = useFetch(
    process.env.CLIENT_LOGIN_LINK,
  );

  const login = ({ username, password }: UserLoginData) => {
    const requestParameters = {
      body: JSON.stringify({ username, password }),
      onSuccess: (res: { token: string }) => {
        if (res.token) {
          setCookies(AUTH_COOKIE, `${res.token}`, 14);
          setState({ auth: true });
        }
      },
    };

    submitLoginFetch(requestParameters);
  };

  const logout = () => {
    deleteCookie(AUTH_COOKIE);
    setState({ auth: false });
  };

  const exportValues = {
    error,
    isLoading,
    isLoggedIn: state.auth,
    logout,
    login,
  };

  return (
    <AuthenticationProvider.Provider value={exportValues}>
      {children}
    </AuthenticationProvider.Provider>
  );
};

export default Authentication;
