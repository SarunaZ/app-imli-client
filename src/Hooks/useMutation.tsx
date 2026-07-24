import { ApolloClient, OperationVariables } from "@apollo/client";
import { useMutation as useApolloMutation } from "@apollo/client/react";
import { MutationDocument } from "Utilities/typesExport";

type MutationOptions<
  Q,
  V extends OperationVariables,
> = useApolloMutation.Options<Q, V>;

const useMutation = <Q, V extends OperationVariables>(
  mutation: MutationDocument<Q, V>,
): [
  (options: MutationOptions<Q, V>) => Promise<ApolloClient.MutateResult<Q>>,
  useApolloMutation.Result<Q>,
] => {
  const [apolloMutation, apolloMutationData] = useApolloMutation(mutation, {
    fetchPolicy: "no-cache",
  });

  const callMutation = (options: MutationOptions<Q, V>) =>
    apolloMutation({
      variables: options.variables as V,
      update: options.update,
    });

  return [callMutation, apolloMutationData];
};

export default useMutation;
