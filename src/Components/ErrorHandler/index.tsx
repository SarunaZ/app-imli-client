import React, { useEffect } from "react";
import style from "./style.scss";
import Info from "Images/icons/info.svg";
import { ApolloError } from "@apollo/client";
import useState from "Hooks/useState";

interface Props {
  error?: { [variables: string]: any } | string | Error | null | ApolloError[];
}

interface State {
  errorMessage: string | null;
}

const ErrorHandler = ({ error }: Props) => {
  const [state, setState] = useState<State>({
    errorMessage: null,
  });

  useEffect(() => {
    if (typeof error === "string") {
      setState({ errorMessage: error });
    }

    if (typeof error === "object") {
      const errorObjMessage = (error as ApolloError)?.message;
      setState({ errorMessage: errorObjMessage });
    }
  }, [state.errorMessage, error]);

  if (state.errorMessage) {
    return (
      <div className={style.errorWrapper}>
        <div className={style.errorIcon}>
          <Info height="18px" />
        </div>
        <span className={style.errorMessage}>{state.errorMessage}</span>
      </div>
    );
  }

  return null;
};

export default ErrorHandler;
