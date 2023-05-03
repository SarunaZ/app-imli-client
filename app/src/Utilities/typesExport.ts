import { DocumentNode, OperationVariables } from "@apollo/client";

export type QueryDocument<
  TData = any,
  TVariables = OperationVariables,
> = DocumentNode;
export type MutationDocument<
  TData = any,
  TVariables = OperationVariables,
> = DocumentNode;
