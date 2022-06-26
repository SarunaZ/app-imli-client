import { deleteCookie, getCookieData, setCookies } from 'Utilities/cookieParser';
import { AuthenticationProvider, UserLoginData } from './Authentication';
import React, { useState } from 'react';
import useFetch from 'Hooks/useFetch';
import { DASHBOARD_DATA } from "../../Schema/queries/dashboardQueries";
import { useQuery } from "@apollo/client";
import { ROUTE_LOGIN_PAGE } from "../../App/constants";

interface Props {
  children: React.ReactChild
}

const AUTH_COOKIE = 'auth';

const Authentication = ({ children }: Props) => {
  const Auth = !!getCookieData(AUTH_COOKIE) || undefined;
  const dashboardQ = useQuery(DASHBOARD_DATA, {
    onCompleted: () => {
      setUsername(dashboardQ.data.userDashboard.username);
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(Auth);
  const [username, setUsername] = useState<string | undefined>('');
  const [submitLoginFetch, { isLoading, error }] =
    useFetch(process.env.REACT_APP_LOGIN_LINK!);

  const login = ({ username, password }: UserLoginData) => {
    const data = { username, password };

    const requestParameters = {
      body: JSON.stringify(data),
      onSuccess: (res: any) => {
        if (res.token) {
          setCookies(AUTH_COOKIE, `${res.token}`, 14);
          setIsLoggedIn(true);
          setUsername(res.username);
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
    username,
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
