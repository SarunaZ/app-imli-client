import { gql } from "@apollo/client";

export const PRODUCT_NAME_MUTATION = gql`
  mutation productMutation($id: String, $name: String!) {
    createProduct(id: $id, name: $name) {
      id
      name
      isDone
    }
  }
`;

export const MEAL_ATTACH_TO_PRODUCT_MUTATION = gql`
  mutation attachMealToProductMutation(
    $ingredients: [IngredientInput]
  ) {
    attachMealToProductMutation(ingredients: $ingredients) {
      id
      name
    }
  }
`;

export const PRODUCT_COMPLETE = gql`
  mutation productCompleteMutation($id: ID!, $value: Boolean) {
    completeProduct(id: $id, value: $value) {
      id
      isDone
    }
  }
`;

export const PRODUCTS_LIST_ORDER_UPDATE_MUTATION = gql`
  mutation productListOrderMutation($newList: [ProductInput]) {
    updateListOrderMutation(newList: $newList) {
      id
      name
      isDone
    }
  }
`;

export const PRODUCTS_LIST_CANCEL_MUTATION = gql`
  mutation productListCancelMutation {
    cancelProductList
  }
`;

export const PRODUCT_DELETE = gql`
  mutation productDeleteMutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
