import {
  ApolloCache,
  FetchResult,
  MutationHookOptions,
  MutationResult,
  OperationVariables,
} from "@apollo/client";
import { useMutation as useApolloMutation } from "@apollo/client/react/hooks/useMutation";
import { MutationDocument } from "Utilities/typesExport";

type MutationOptions<A, B> = MutationHookOptions<A, B>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMutation = <Q, V extends OperationVariables>(
  mutation: MutationDocument<Q, V>,
): [
  (options?: MutationOptions<Q, V>) => Promise<FetchResult<Q>>,
  MutationResult<Q>,
] => {
  const [apolloMutation, apolloMutationData] = useApolloMutation<Q, V>(
    mutation,
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  );

  const callMutation = (options: MutationOptions<Q, V>) => {
    const mutationOptions = {
      variables: {
        ...options.variables,
      },
      update: (
        cache: ApolloCache<Q>,
        result: FetchResult<Q>,
        mutationOptions: { variables: V },
      ) => {
        if (options.update) {
          options.update(cache, result, mutationOptions);
        }
      },
    };

    return apolloMutation(mutationOptions);
  };

  return [callMutation, apolloMutationData];
};

export default useMutation;
