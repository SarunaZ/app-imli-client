import { gql } from "@apollo/client";

export const MEAL_NAME_MUTATION = gql`
  mutation mealMutation($id: String, $name: String!, $ingredients: [IngredientInput]) {
    createMeal(id: $id, name: $name, ingredients: $ingredients) {
        id
        name
        ingredients {
          name
        }
    }
  }
`;

export const PRODUCT_NAME_MUTATION = gql`
  mutation productMutation($id: String, $name: String!) {
    createProduct(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const MEAL_ATTACH_TO_PRODUCT_MUTATION = gql`
  mutation attachMealToProductMutation($ingredients: [IngredientInput]) {
    attachMealToProductMutation(ingredients: $ingredients) {
      id
      name
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

export const PRODUCT_DELETE = gql`
  mutation productDeleteMutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
export const PRODUCTS_LIST_ORDER_UPDATE_MUTATION = gql`
  mutation productListOrderMutation($newList: [ProductInput]) {
    updateListOrderMutation(newList: $newList) {
      id
      name
    }
  }
`;