import React, { ElementRef, SyntheticEvent, useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import Button from "Components/Button";
import Input from "Components/Input";
import ErrorHandler from "Components/ErrorHandler";
import style from "./style.scss";
import useState from "Hooks/useState";

interface State {
  isRegister: boolean;
}
const LoginView = () => {
  const [state, setState] = useState<State>({
    isRegister: false,
  });

  const { login, register, isLoading, error } = useContext(
    AuthenticationProvider,
  );
  const usernameRef = useRef<ElementRef<"input">>(null);
  const passwordRef = useRef<ElementRef<"input">>(null);

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    if (state.isRegister) {
      register?.(userData);

      return;
    }

    login?.(userData);
  };

  const handleRegister = () => {
    setState({ isRegister: true });
  };

  const titleLabel = state.isRegister ? "Register" : "Login";

  return (
    <>
      <Helmet title={`${titleLabel} | Imli`} />
      <div className={style.loginWrapper}>
        <div className={style.loginContent}>
          <h2 className={style.loginPageTitle}>{titleLabel}</h2>
          <form className={style.loginForm} onSubmit={handleOnSubmit}>
            <Input
              required
              color="white"
              ref={usernameRef}
              label="Username"
              name="username"
              type="text"
            />
            <Input
              required
              color="white"
              ref={passwordRef}
              label="Password"
              name="password"
              type="password"
            />
            <div className={style.error}>
              <ErrorHandler error={error} />
            </div>
            {process.env.NODE_ENV === "development" && (
              <Button
                className={style.registerButton}
                buttonStyle="none"
                onClick={handleRegister}
              >
                Register
              </Button>
            )}
            <Button
              type="submit"
              buttonStyle="prime"
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
