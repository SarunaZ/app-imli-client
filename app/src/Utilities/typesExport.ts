import { DocumentNode, OperationVariables } from "@apollo/client";

export interface QueryDocument<TData = any, TVariables = OperationVariables> extends DocumentNode { };
export interface MutationDocument<TData = any, TVariables = OperationVariables> extends DocumentNode { };
