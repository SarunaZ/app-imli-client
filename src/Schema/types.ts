export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type IngredientInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Ingredients = {
  __typename?: 'Ingredients';
  name: Scalars['String']['output'];
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['ID']['output'];
  ingredients?: Maybe<Array<Maybe<Ingredients>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  attachMealToProductMutation?: Maybe<Product>;
  cancelProductList?: Maybe<Scalars['String']['output']>;
  completeProduct: Product;
  createMeal: Meal;
  createProduct: Product;
  deleteMeal?: Maybe<Null>;
  deleteProduct?: Maybe<Null>;
  editMeal?: Maybe<Null>;
  renameProduct: Product;
  updateListOrderMutation?: Maybe<Array<Product>>;
};


export type MutationAttachMealToProductMutationArgs = {
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>>>;
};


export type MutationCompleteProductArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateMealArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>>>;
  name: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  isDone?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};


export type MutationDeleteMealArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditMealArgs = {
  id: Scalars['ID']['input'];
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>>>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRenameProductArgs = {
  id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};


export type MutationUpdateListOrderMutationArgs = {
  newList?: InputMaybe<Array<InputMaybe<ProductInput>>>;
};

export type Null = {
  __typename?: 'Null';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID']['output'];
  isDone?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProductInput = {
  id: Scalars['ID']['input'];
  isDone: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  meals?: Maybe<Array<Meal>>;
  products?: Maybe<Array<Product>>;
  userDashboard: UserDashboard;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserDashboard = {
  __typename?: 'UserDashboard';
  username?: Maybe<Scalars['String']['output']>;
};

export type MealMutationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>> | InputMaybe<IngredientInput>>;
}>;


export type MealMutationMutation = { __typename?: 'Mutation', createMeal: { __typename?: 'Meal', id: string, name?: string | null, ingredients?: Array<{ __typename?: 'Ingredients', name: string } | null> | null } };

export type EditMealMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>> | InputMaybe<IngredientInput>>;
  instructions?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditMealMutationMutation = { __typename?: 'Mutation', editMeal?: { __typename?: 'Null', success?: boolean | null } | null };

export type MealDeleteMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MealDeleteMutationMutation = { __typename?: 'Mutation', deleteMeal?: { __typename?: 'Null', success?: boolean | null } | null };

export type ProductMutationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
}>;


export type ProductMutationMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name?: string | null, isDone?: boolean | null } };

export type AttachMealToProductMutationVariables = Exact<{
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>> | InputMaybe<IngredientInput>>;
}>;


export type AttachMealToProductMutation = { __typename?: 'Mutation', attachMealToProductMutation?: { __typename?: 'Product', id: string, name?: string | null } | null };

export type ProductListOrderMutationVariables = Exact<{
  newList?: InputMaybe<Array<InputMaybe<ProductInput>> | InputMaybe<ProductInput>>;
}>;


export type ProductListOrderMutation = { __typename?: 'Mutation', updateListOrderMutation?: Array<{ __typename?: 'Product', id: string, name?: string | null, isDone?: boolean | null }> | null };

export type ProductListCancelMutationVariables = Exact<{ [key: string]: never; }>;


export type ProductListCancelMutation = { __typename?: 'Mutation', cancelProductList?: string | null };

export type ProductDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductDeleteMutation = { __typename?: 'Mutation', deleteProduct?: { __typename?: 'Null', success?: boolean | null } | null };

export type ProductRenameMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
}>;


export type ProductRenameMutation = { __typename?: 'Mutation', renameProduct: { __typename?: 'Product', id: string, name?: string | null, isDone?: boolean | null } };

export type ProductCompleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  value: Scalars['Boolean']['input'];
}>;


export type ProductCompleteMutation = { __typename?: 'Mutation', completeProduct: { __typename?: 'Product', id: string, name?: string | null, isDone?: boolean | null } };

export type UserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDataQuery = { __typename?: 'Query', userDashboard: { __typename?: 'UserDashboard', username?: string | null } };

export type MealListQueryVariables = Exact<{ [key: string]: never; }>;


export type MealListQuery = { __typename?: 'Query', meals?: Array<{ __typename?: 'Meal', id: string, name?: string | null, ingredients?: Array<{ __typename?: 'Ingredients', name: string } | null> | null }> | null };

export type ProductListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductListQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', id: string, name?: string | null, isDone?: boolean | null }> | null, meals?: Array<{ __typename?: 'Meal', id: string, name?: string | null, ingredients?: Array<{ __typename?: 'Ingredients', name: string } | null> | null }> | null };

export type MealDropDownListQueryVariables = Exact<{ [key: string]: never; }>;


export type MealDropDownListQuery = { __typename?: 'Query', meals?: Array<{ __typename?: 'Meal', id: string, name?: string | null, ingredients?: Array<{ __typename?: 'Ingredients', name: string } | null> | null }> | null };
