import { gql } from "@apollo/client";
import {
  AttachMealToProductMutationMutation,
  AttachMealToProductMutationMutationVariables,
  ProductDeleteMutationMutation,
  ProductDeleteMutationMutationVariables,
  ProductListCancelMutationMutation,
  ProductListCancelMutationMutationVariables,
  ProductListOrderMutationMutation,
  ProductListOrderMutationMutationVariables,
  ProductMutationMutation,
  ProductMutationMutationVariables,
} from "Schema/types";
import { MutationDocument } from "Utilities/typesExport";

export const PRODUCT_NAME_MUTATION: MutationDocument<
  ProductMutationMutation,
  ProductMutationMutationVariables
> = gql`
  mutation productMutation($id: String, $name: String!) {
    createProduct(id: $id, name: $name) {
      id
      name
      isDone
    }
  }
`;

export const MEAL_ATTACH_TO_PRODUCT_MUTATION: MutationDocument<
  AttachMealToProductMutationMutation,
  AttachMealToProductMutationMutationVariables
> = gql`
  mutation attachMealToProductMutation($ingredients: [IngredientInput]) {
    attachMealToProductMutation(ingredients: $ingredients) {
      id
      name
    }
  }
`;

export const PRODUCTS_LIST_ORDER_UPDATE_MUTATION: MutationDocument<
  ProductListOrderMutationMutation,
  ProductListOrderMutationMutationVariables
> = gql`
  mutation productListOrderMutation($newList: [ProductInput]) {
    updateListOrderMutation(newList: $newList) {
      id
      name
      isDone
    }
  }
`;

export const PRODUCTS_LIST_CANCEL_MUTATION: MutationDocument<
  ProductListCancelMutationMutation,
  ProductListCancelMutationMutationVariables
> = gql`
  mutation productListCancelMutation {
    cancelProductList
  }
`;

export const PRODUCT_DELETE: MutationDocument<
  ProductDeleteMutationMutation,
  ProductDeleteMutationMutationVariables
> = gql`
  mutation productDeleteMutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
