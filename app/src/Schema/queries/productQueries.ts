import { gql } from "@apollo/client";
import { MealDropDownListQuery, MealDropDownListQueryVariables, ProductListQuery, ProductListQueryVariables } from "Schema/types";
import { QueryDocument } from "Utilities/typesExport";

export const PRODUCT_LIST_DATA: QueryDocument<
  ProductListQuery,
  ProductListQueryVariables
> = gql`
  query productList {
      products {
        id
        name
        isDone
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

export const MEAL_LIST_DATA: QueryDocument<
  MealDropDownListQuery,
  MealDropDownListQueryVariables
> = gql`
  query mealDropDownList {
      meals {
        id
        name
        ingredients {
          name
        }
      }
    }
`;