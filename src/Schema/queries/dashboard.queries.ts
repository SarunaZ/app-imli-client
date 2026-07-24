import { gql } from "@apollo/client";
import { UserDashboard, UserDataQuery, UserDataQueryVariables } from "Schema/types";
import { QueryDocument } from "Utilities/typesExport";

export const DASHBOARD_DATA: QueryDocument<UserDataQuery, UserDataQueryVariables> = gql`
  query userData {
    userDashboard {
      username
    }
  }
`;
