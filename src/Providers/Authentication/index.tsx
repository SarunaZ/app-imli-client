import { deleteCookie, getCookieData, setCookies } from 'Utilities/cookieParser';
import { AuthenticationProvider, UserLoginData } from './Authentication';
import React, { useState } from 'react';
import useFetch from "Hooks/useFetch";
import jwt from 'jsonwebtoken';

interface Props {
  children: React.ReactChild
}

const Authentication = ({children}: Props) => {
  const Auth = getCookieData('auth') || '';
  const isLoggedInCookie =
    Auth
      ? Boolean(jwt.verify(Auth, process.env.REACT_APP_AUTH_SECRET || ''))
      : false;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInCookie);
  const [username, setUsername] = useState<string>("");
  const [submitLoginFetch] = useFetch('http://localhost:4000/api/login');

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

  return (
    <AuthenticationProvider.Provider value={{isLoggedIn, login, logout}}>
      {children} 
    </AuthenticationProvider.Provider>
  );
}

export default Authentication;