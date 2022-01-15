import {SyntheticEvent, useContext, useRef} from 'react';
import { Helmet } from 'react-helmet-async';
import {AuthenticationProvider} from "Providers/Authentication/Authentication";

const LoginView = () => {
  const { login } = useContext(AuthenticationProvider);
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
      <section>
        <h2>Login page</h2>
        <form onSubmit={submitLogin}>
          <label htmlFor="username">Username</label>
          <input required ref={usernameRef} name="username" type="text" />
          <label htmlFor="password">Username</label>
          <input required ref={passwordRef} name="password" type="password" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default LoginView;

