import React, { useEffect, useState } from "react";
import style from "./style.scss";
import Info from "Images/icons/info.svg";
import { ApolloError } from "@apollo/client";

interface Props {
  error?: { [variables: string]: any } | string | Error | null | ApolloError[];
}

const ErrorHandler = ({ error }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof error === "string") {
      setErrorMessage(error);
    }

    if (typeof error === "object") {
      const errorObjMessage = (error as ApolloError)?.message;
      setErrorMessage(errorObjMessage);
    }
  }, [errorMessage, error]);

  if (errorMessage) {
    return (
      <div className={style.errorWrapper}>
        <div className={style.errorIcon}>
          <Info height="18px" />
        </div>
        <span className={style.errorMessage}>{errorMessage}</span>
      </div>
    );
  }

  return null;
};

export default ErrorHandler;
