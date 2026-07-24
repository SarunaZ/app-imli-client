import { OperationVariables } from "@apollo/client";
import { useQuery as useApolloQuery } from "@apollo/client/react";
import { QueryDocument } from "Utilities/typesExport";

const useQuery = <Q, V extends OperationVariables>(
  query: QueryDocument<Q, V>,
  options?: useApolloQuery.Options<Q, V>,
) => {
  const { loading, error, data, refetch } = useApolloQuery(query, options);

  return { loading, error, data, refetch };
};

export default useQuery;
