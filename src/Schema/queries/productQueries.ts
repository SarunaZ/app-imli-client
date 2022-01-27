import { gql } from "@apollo/client";

export const PRODUCT_LIST_DATA = gql`
  query productList {
      products {
        id
        name
      }
      meals {
        id
        name
        ingredients {
            name
        }
      }
    }
`;