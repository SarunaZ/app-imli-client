import React, { useState } from 'react';
import { deleteCookie, getCookieData, setCookies } from 'Utilities/cookieParser';
import { AuthenticationProvider, UserLoginData } from './Authentication';
import useFetch from 'Hooks/useFetch';
import { ROUTE_LOGIN_PAGE } from "App/constants";

interface Props {
  children: React.ReactNode
}

const AUTH_COOKIE = 'auth';

const Authentication = ({ children }: Props) => {
  const Auth = !!getCookieData(AUTH_COOKIE) || undefined;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(Auth);
  const [submitLoginFetch, { isLoading, error }] =
    useFetch(process.env.REACT_APP_LOGIN_LINK!);

  const login = ({ username, password }: UserLoginData) => {
    const data = { username, password };

    const requestParameters = {
      body: JSON.stringify(data),
      onSuccess: (res: { token: string }) => {
        if (res.token) {
          setCookies(AUTH_COOKIE, `${res.token}`, 14);
          setIsLoggedIn(true);
        }
      }
    };

    submitLoginFetch(requestParameters);
  };

  const logout = () => {
    deleteCookie(AUTH_COOKIE);
    window.location.href = `${process.env.REACT_APP_BASE_URL}${ROUTE_LOGIN_PAGE}`;
  };

  const exportValues = {
    error,
    isLoading,
    isLoggedIn,
    logout,
    login
  };

  return (
    <AuthenticationProvider.Provider value={exportValues}>
      {children}
    </AuthenticationProvider.Provider>
  );
};

export default Authentication;
