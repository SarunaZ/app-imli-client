import { gql } from "@apollo/client";
import {
  EditMealMutationMutation,
  EditMealMutationMutationVariables,
  MealMutationMutation,
  MealMutationMutationVariables,
} from "Schema/types";
import { MutationDocument } from "Utilities/typesExport";

export const MEAL_NAME_MUTATION: MutationDocument<
  MealMutationMutation,
  MealMutationMutationVariables
> = gql`
  mutation mealMutation(
    $id: String
    $name: String!
    $ingredients: [IngredientInput]
    $instructions: String
  ) {
    createMeal(
      id: $id
      name: $name
      ingredients: $ingredients
      instructions: $instructions
    ) {
      id
      name
      instructions
      ingredients {
        name
      }
    }
  }
`;
export const MEAL_EDIT_MUTATION: MutationDocument<
  EditMealMutationMutation,
  EditMealMutationMutationVariables
> = gql`
  mutation editMealMutation(
    $id: ID!
    $name: String!
    $ingredients: [IngredientInput]
    $instructions: String
  ) {
    editMeal(
      id: $id
      name: $name
      instructions: $instructions
      ingredients: $ingredients
    ) {
      success
    }
  }
`;

export const MEAL_DELETE = gql`
  mutation mealDeleteMutation($id: ID!) {
    deleteMeal(id: $id) {
      success
    }
  }
`;
