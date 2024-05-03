import useState from "./useState";

interface State {
  isLoading: boolean;
  error?: { [variables: string]: any } | string | Error | null;
  data?: { [variables: string]: any } | null;
}

const DEFAULT_OPTIONS = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

interface FetchOptions {
  url?: string;
  method?: string;
  variables?: {
    [variable: string]: any;
  };
  credentials?: RequestCredentials;
  headers?: {
    [variable: string]: any;
  };
  locale?: boolean;
  error?: (error: any) => any;
  onSuccess?: (data: any) => void;
}

interface DataInterface {
  (all: FetchOptions): void;
}

type UseFetchTuple = [DataInterface, Partial<State>];

const useFetch = (url: string): UseFetchTuple => {
  const [state, setState] = useState<State>({
    isLoading: false,
    error: undefined,
    data: undefined,
  });

  const fetchContainer = async (options?: FetchOptions) => {
    setState({ ...state, isLoading: true });

    const response = await fetch(url, {
      ...DEFAULT_OPTIONS,
      ...options,
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .catch((error) => {
        console.error(error);
        setState({ ...state, error, isLoading: false });
      });

    const resultData = await response.json();
    setState({ ...state, data: resultData, isLoading: false });

    if (!resultData) {
      setState({
        ...state,
        error: resultData.status,
        isLoading: false,
      });
    }

    if (options?.onSuccess) {
      options.onSuccess(resultData);
    }

    return resultData;
  };

  const fetchInit = (options?: FetchOptions) => {
    try {
      fetchContainer(options);
    } catch (error: any) {
      setState({ ...state, error, isLoading: false });
      console.log(state.error, "errror");

      return error;
    }
  };

  return [fetchInit, state];
};

export default useFetch;
