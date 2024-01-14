import { OperationVariables } from "@apollo/client";
import { useQuery as useApolloQuery } from "@apollo/client/react/hooks/useQuery";
import { QueryHookOptions } from "@apollo/client/react/types/types";
import { QueryDocument } from "Utilities/typesExport";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useQuery = <Q, V extends OperationVariables>(
  query: QueryDocument<Q, V>,
  options?: QueryHookOptions<Q, V>,
) => {
  const { loading, error, data, refetch } = useApolloQuery<Q, V>(query, {
    errorPolicy: "all",
    ...options,
  });

  return { loading, error, data, refetch };
};

export default useQuery;
