import { gql } from "@apollo/client";

export const MEAL_LIST_DATA = gql`
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
