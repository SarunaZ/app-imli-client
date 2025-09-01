import { gql } from "@apollo/client";
import {
  ChoreCreateMutation,
  ChoreCreateMutationVariables,
  ChoreDeleteMutation,
  ChoreDeleteMutationVariables,
  ChoreSaveMutation,
  ChoreSaveMutationVariables,
  ChoreTakeMutation,
  ChoreTakeMutationVariables,
} from "Schema/types";
import { MutationDocument } from "Utilities/typesExport";

export const CHORE_CREATE_MUTATION: MutationDocument<
  ChoreCreateMutation,
  ChoreCreateMutationVariables
> = gql`
  mutation choreCreate($id: String, $name: String!) {
    createChore(id: $id, name: $name) {
      id
      name
      timestamp
    }
  }
`;

export const CHORE_SAVE_MUTATION: MutationDocument<
  ChoreSaveMutation,
  ChoreSaveMutationVariables
> = gql`
  mutation choreSave($id: ID!, $name: String!) {
    saveChore(id: $id, name: $name) {
      id
      name
      timestamp
    }
  }
`;

export const CHORE_DELETE_MUTATION: MutationDocument<
  ChoreDeleteMutation,
  ChoreDeleteMutationVariables
> = gql`
  mutation choreDelete($id: ID!) {
    deleteChore(id: $id) {
      success
    }
  }
`;

export const CHORE_TAKE_MUTATION: MutationDocument<
  ChoreTakeMutation,
  ChoreTakeMutationVariables
> = gql`
  mutation choreTake($id: ID!) {
    takeChore(id: $id) {
      id
      name
      timestamp
    }
  }
`;
