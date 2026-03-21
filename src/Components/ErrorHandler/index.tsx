import { useEffect } from "react";
import style from "./style.module.scss";
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
  let errorMessage = null;

  if (typeof error === "string") {
    errorMessage = error;
  }

  if (typeof error === "object") {
    errorMessage = (error as ApolloError)?.message;
  }

  if (errorMessage) {
    return (
      <div className={style.errorWrapper}>
        <div className={style.errorIcon}>
          <Info />
        </div>
        <span className={style.errorMessage}>{errorMessage}</span>
      </div>
    );
  }

  return null;
};

export default ErrorHandler;
