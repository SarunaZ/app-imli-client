import { useState } from "react";
interface State {
  isLoading: boolean;
  error?: { [variables: string]: any } | string | Error | null | unknown;
  data?: { [variables: string]: any } | null;
}

const DEFAULT_OPTIONS = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}

interface FetchOptions {
  url?: string;
  method?: string;
  variables?: {
    [variable: string]: any
  };
  credentials?: RequestCredentials;
  headers?: {
    [variable: string]: any
  };
  locale?: boolean;
  error?: (error: any) => any;
  onSuccess?: (data: any) => void;
}

interface DataInterface {
  (all: FetchOptions): void;
};

type UseFetchTuple = [DataInterface, State];

const useFetch = (url: string): UseFetchTuple => {
  const [state, setState] = useState<State>({
    isLoading: false,
    error: undefined,
    data: undefined
  });

  const fetchInit = async (options?: FetchOptions) => {
    setState({ ...state, isLoading: true });

    try {
      const response = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
      const resultData = await response.json();
      setState({ ...state, data: resultData })
      setState({ ...state, isLoading: false })

      if (options?.onSuccess) {
        options.onSuccess(resultData);
      }

      return resultData;
    }
    catch (error) {
      setState({ ...state, error })
      setState({ ...state, isLoading: false })
      return error;
    }
  }

  return [fetchInit, state];
}

export default useFetch;