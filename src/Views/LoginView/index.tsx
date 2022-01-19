import {SyntheticEvent, useContext, useRef} from 'react';
import { Helmet } from 'react-helmet-async';
import {AuthenticationProvider} from "Providers/Authentication/Authentication";
import style from './style.module.scss';
import Button from 'Components/Button';

const LoginView = () => {
  const { login, isLoading } = useContext(AuthenticationProvider);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value
    }

    login(userData);
  }

  return (
    <>
      <Helmet title={'Login | Imli'} />
      <div className={style.loginWrapper}>
        <div className={style.loginContent}>
          <h2 className={style.loginPageTitle}>Login</h2>
          <form className={style.loginForm} onSubmit={submitLogin}>
            <label 
              htmlFor="username"
              className={style.loginLabel}
            >
              Username
              <input 
                className={style.loginInput} 
                required ref={usernameRef} 
                name="username" 
                type="text" 
              />
            </label>
            <label 
              className={style.loginLabel}
              htmlFor="password"
            >
              Password
              <input
                className={style.loginInput}
                required ref={passwordRef}
                name="password"
                type="password"
              />
            </label>
            <Button 
              isLoading={isLoading}
              type="submit"
            >
              <span className={style.loginButtonText}>Submit</span> 
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginView;

