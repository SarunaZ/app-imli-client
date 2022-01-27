import { deleteCookie, getCookieData, setCookies } from 'Utilities/cookieParser';
import { AuthenticationProvider, UserLoginData } from './Authentication';
import React, { useState } from 'react';
import useFetch from 'Hooks/useFetch';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

interface Props {
  children: React.ReactChild
}

interface Auth {
  password: string;
  username: string
}

const Authentication = ({ children }: Props) => {
  const Auth = getCookieData('auth') || undefined;
  const decodedAuth = Auth ? jwt_decode<Auth>(Auth) : undefined;

  const isLoggedInCookie =
    Auth
      ? Boolean(jwt.verify(Auth, process.env.REACT_APP_AUTH_SECRET!))
      : false;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInCookie);
  const [username, setUsername] = useState<string | undefined>(decodedAuth?.username);
  const [submitLoginFetch, { isLoading, error }] =
    useFetch(process.env.REACT_APP_LOGIN_LINK!);

  const login = ({ username, password }: UserLoginData) => {
    const data = { username, password };

    const requestParameters = {
      body: JSON.stringify(data),
      onSuccess: (res: any) => {
        if (res.user) {
          const resDecode = jwt_decode<Auth>(res.user);
          setCookies('auth', `${res.user}`, 14);
          setIsLoggedIn(true);
          setUsername(resDecode.username);
        }
      }
    };

    submitLoginFetch(requestParameters);
  };

  const logout = () => {
    deleteCookie('auth');
    setIsLoggedIn(false);
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
