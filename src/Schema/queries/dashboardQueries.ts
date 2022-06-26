import { gql } from "@apollo/client";

export const DASHBOARD_DATA = gql`
    query userData {
        userDashboard {
            username
        }
    }
`;