import React, { SyntheticEvent, useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import Button from "Components/Button";
import Input from "Components/Input";
import ErrorHandler from "Components/ErrorHandler";
import style from "./style.scss";

const LoginView = () => {
  const { login, isLoading, error } = useContext(AuthenticationProvider);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    login?.(userData);
  };

  return (
    <>
      <Helmet title={"Login | Imli"} />
      <div className={style.loginWrapper}>
        <div className={style.loginContent}>
          <h2 className={style.loginPageTitle}>Login</h2>
          <form className={style.loginForm} onSubmit={submitLogin}>
            <Input
              required
              ref={usernameRef}
              label="Username"
              name="username"
              type="text"
            />
            <Input
              required
              ref={passwordRef}
              label="Password"
              name="password"
              type="password"
            />
            <div className={style.error}>
              <ErrorHandler error={error} />
            </div>
            <Button
              isPrimary
              type="submit"
              className={style.loginButton}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginView;
