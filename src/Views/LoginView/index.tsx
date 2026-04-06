import { ElementRef, SyntheticEvent, useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { AuthenticationProvider } from "Providers/Authentication/Authentication";
import Button from "Components/Button";
import Input from "Components/Input";
import ErrorHandler from "Components/ErrorHandler";
import useState from "Hooks/useState";

interface State {
  isRegister: boolean;
}

const LoginView = () => {
  const [state, setState] = useState<State>({ isRegister: false });
  const { login, register, isLoading, error } = useContext(AuthenticationProvider);
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

  const titleLabel = state.isRegister ? "Register" : "Login";

  return (
    <>
      <Helmet title={`${titleLabel} | Imli`} />
      <div className="flex min-h-dvh items-center justify-center bg-primary px-4">
        <div className="w-full max-w-md rounded-2xl bg-primary-light p-8 shadow-2xl">
          <h2 className="mb-8 text-2xl font-bold text-white">{titleLabel}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
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
            {error && (
              <div className="mt-2">
                <ErrorHandler error={error} />
              </div>
            )}
            {import.meta.env.DEV && (
              <Button
                buttonStyle="none"
                className="self-end text-sm text-white/70 hover:text-white"
                onClick={() => setState({ isRegister: true })}
              >
                Register
              </Button>
            )}
            <Button
              type="submit"
              buttonStyle="prime"
              className="mt-2 w-full"
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
