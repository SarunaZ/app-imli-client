import { DocumentNode, OperationVariables } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface QueryDocument<TData = any, TVariables = OperationVariables>
  extends DocumentNode {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface MutationDocument<TData = any, TVariables = OperationVariables>
  extends DocumentNode {}
