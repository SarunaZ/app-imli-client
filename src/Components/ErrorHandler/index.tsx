import Info from "Images/icons/info.svg";
import { ApolloError } from "@apollo/client";

interface Props {
  error?: { [variables: string]: any } | string | Error | null | ApolloError[];
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
      <div className="flex items-center gap-3 rounded-lg bg-danger px-4 py-3 text-sm font-semibold text-danger-strong">
        <div className="flex shrink-0 items-center">
          <Info />
        </div>
        <span>{errorMessage}</span>
      </div>
    );
  }

  return null;
};

export default ErrorHandler;
