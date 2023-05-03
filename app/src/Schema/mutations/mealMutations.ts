import { gql } from "@apollo/client";

export const MEAL_NAME_MUTATION = gql`
  mutation mealMutation(
    $id: String
    $name: String!
    $ingredients: [IngredientInput]
  ) {
    createMeal(id: $id, name: $name, ingredients: $ingredients) {
      id
      name
      ingredients {
        name
      }
    }
  }
`;

export const MEAL_DELETE = gql`
  mutation mealDeleteMutation($id: ID!) {
    deleteMeal(id: $id) {
      id
    }
  }
`;
