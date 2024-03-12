import { gql } from "@apollo/client";
import {
  AttachMealToProductMutation,
  AttachMealToProductMutationVariables,
  ProductCompleteMutation,
  ProductCompleteMutationVariables,
  ProductDeleteMutation,
  ProductDeleteMutationVariables,
  ProductListCancelMutation,
  ProductListCancelMutationVariables,
  ProductListOrderMutation,
  ProductListOrderMutationVariables,
  ProductMutationMutation,
  ProductMutationMutationVariables,
  ProductRenameMutation,
  ProductRenameMutationVariables,
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
  AttachMealToProductMutation,
  AttachMealToProductMutationVariables
> = gql`
  mutation attachMealToProduct($ingredients: [IngredientInput]) {
    attachMealToProductMutation(ingredients: $ingredients) {
      id
      name
    }
  }
`;

export const PRODUCTS_LIST_ORDER_UPDATE_MUTATION: MutationDocument<
  ProductListOrderMutation,
  ProductListOrderMutationVariables
> = gql`
  mutation productListOrder($newList: [ProductInput]) {
    updateListOrderMutation(newList: $newList) {
      id
      name
      isDone
    }
  }
`;

export const PRODUCTS_LIST_CANCEL_MUTATION: MutationDocument<
  ProductListCancelMutation,
  ProductListCancelMutationVariables
> = gql`
  mutation productListCancel {
    cancelProductList
  }
`;

export const PRODUCT_DELETE: MutationDocument<
  ProductDeleteMutation,
  ProductDeleteMutationVariables
> = gql`
  mutation productDelete($id: ID!) {
    deleteProduct(id: $id) {
      success
    }
  }
`;

export const PRODUCT_RENAME_PRODUCT: MutationDocument<
  ProductRenameMutation,
  ProductRenameMutationVariables
> = gql`
  mutation productRename($id: ID!, $value: String!) {
    renameProduct(id: $id, value: $value) {
      id
      name
      isDone
    }
  }
`;

export const PRODUCT_COMPLETE: MutationDocument<
  ProductCompleteMutation,
  ProductCompleteMutationVariables
> = gql`
  mutation productComplete($id: ID!, $value: Boolean!) {
    completeProduct(id: $id, value: $value) {
      id
      name
      isDone
    }
  }
`;
