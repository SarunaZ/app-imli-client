import { OperationVariables, TypedDocumentNode } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueryDocument<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> extends TypedDocumentNode<TData, TVariables> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutationDocument<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> extends TypedDocumentNode<TData, TVariables> {}
