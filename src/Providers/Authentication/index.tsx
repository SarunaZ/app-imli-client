import { deleteCookie, getCookieData, setCookies } from 'Utilities/cookieParser';
import { AuthenticationProvider, UserLoginData } from './Authentication';
import React, { useState } from 'react';
import useFetch from "Hooks/useFetch";
import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

interface Props {
  children: React.ReactChild
}

interface Auth {
  password: string;
  username: string
}

const Authentication = ({children}: Props) => {
  const Auth = getCookieData('auth') || '';
  const decoded = jwt_decode<Auth>(Auth);
  
  const isLoggedInCookie =
    Auth
      ? Boolean(jwt.verify(Auth, process.env.REACT_APP_AUTH_SECRET || ''))
      : false;

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInCookie);
  const [username, setUsername] = useState<string>(decoded.username);
  const [submitLoginFetch, { isLoading }] = 
    useFetch(process.env.REACT_APP_LOGIN_LINK || '');

  const login = ({ username, password }: UserLoginData) => {
    const data = { username, password };

    const requestParameters = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      onSuccess: (res: any) => {
        if (res.user) {
          setCookies('auth', `${res.user}`, 14);
          setIsLoggedIn(true);
        }
      }
    }

    submitLoginFetch(requestParameters);
  }

  const logout = () => {
    deleteCookie('auth');
    setIsLoggedIn(false);
  };

  const exportValues = {
    username,
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
}

export default Authentication;