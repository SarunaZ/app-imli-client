import React, { useState } from "react";
import {
  deleteCookie,
  getCookieData,
  setCookies,
} from "Utilities/cookieParser";
import { AuthenticationProvider, UserLoginData } from "./Authentication";
import useFetch from "Hooks/useFetch";

interface Props {
  children: React.ReactNode;
}

const AUTH_COOKIE = "auth";

const Authentication = ({ children }: Props) => {
  const Auth = !!getCookieData(AUTH_COOKIE) || undefined;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(Auth);
  const [submitLoginFetch, { isLoading, error }] = useFetch(
    process.env.CLIENT_LOGIN_LINK!,
  );

  const login = ({ username, password }: UserLoginData) => {
    const requestParameters = {
      body: JSON.stringify({ username, password }),
      onSuccess: (res: { token: string }) => {
        if (res.token) {
          setCookies(AUTH_COOKIE, `${res.token}`, 14);
          setIsLoggedIn(true);
        }
      },
    };

    submitLoginFetch(requestParameters);
  };

  const logout = () => {
    deleteCookie(AUTH_COOKIE);
    setIsLoggedIn(false);
  };

  const exportValues = {
    error,
    isLoading,
    isLoggedIn,
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
