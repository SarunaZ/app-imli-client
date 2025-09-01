import { gql } from "@apollo/client";
import { ChoreListQuery, ChoreListQueryVariables } from "Schema/types";
import { QueryDocument } from "Utilities/typesExport";

export const CHORE_LIST_DATA: QueryDocument<
  ChoreListQuery,
  ChoreListQueryVariables
> = gql`
  query choreList {
    chores {
      id
      name
      timestamp
    }
  }
`;
