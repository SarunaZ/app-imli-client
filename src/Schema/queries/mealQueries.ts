import { gql } from "@apollo/client";
import { MealListQuery, MealListQueryVariables } from "Schema/types";
import { QueryDocument } from "Utilities/typesExport";

export const MEAL_LIST_DATA: QueryDocument<MealListQuery, MealListQueryVariables> = gql`
  query mealList {
    meals {
      id
      name
      ingredients {
        name
      }
    }
  }
`;
