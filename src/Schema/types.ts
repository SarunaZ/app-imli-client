export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type IngredientInput = {
  name?: Maybe<Scalars["String"]>;
};

export type Ingredients = {
  __typename?: "Ingredients";
  name: Scalars["String"];
};

export type Meal = {
  __typename?: "Meal";
  id: Scalars["ID"];
  ingredients?: Maybe<Array<Maybe<Ingredients>>>;
  name?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  attachMealToProductMutation?: Maybe<Product>;
  cancelProductList?: Maybe<Scalars["String"]>;
  completeProduct: Product;
  createMeal: Meal;
  createProduct: Product;
  deleteMeal?: Maybe<Meal>;
  deleteProduct?: Maybe<Product>;
  updateListOrderMutation?: Maybe<Array<Product>>;
};

export type MutationAttachMealToProductMutationArgs = {
  ingredients?: Maybe<Array<Maybe<IngredientInput>>>;
};

export type MutationCompleteProductArgs = {
  id: Scalars["ID"];
  value?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateMealArgs = {
  id?: Maybe<Scalars["String"]>;
  ingredients?: Maybe<Array<Maybe<IngredientInput>>>;
  name: Scalars["String"];
};

export type MutationCreateProductArgs = {
  id?: Maybe<Scalars["String"]>;
  isDone?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
};

export type MutationDeleteMealArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteProductArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateListOrderMutationArgs = {
  newList?: Maybe<Array<Maybe<ProductInput>>>;
};

export type Null = {
  __typename?: "Null";
  success?: Maybe<Scalars["Boolean"]>;
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  isDone?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
};

export type ProductInput = {
  id: Scalars["ID"];
  isDone: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  meals?: Maybe<Array<Meal>>;
  products?: Maybe<Array<Product>>;
  userDashboard: UserDashboard;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UserDashboard = {
  __typename?: "UserDashboard";
  username?: Maybe<Scalars["String"]>;
};

export type MealMutationMutationVariables = Exact<{
  id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  ingredients?: Maybe<Array<Maybe<IngredientInput>> | Maybe<IngredientInput>>;
}>;

export type MealMutationMutation = {
  __typename?: "Mutation";
  createMeal: {
    __typename?: "Meal";
    id: string;
    name?: Maybe<string>;
    ingredients?: Maybe<
      Array<Maybe<{ __typename?: "Ingredients"; name: string }>>
    >;
  };
};

export type MealDeleteMutationMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type MealDeleteMutationMutation = {
  __typename?: "Mutation";
  deleteMeal?: Maybe<{ __typename?: "Meal"; id: string }>;
};

export type ProductMutationMutationVariables = Exact<{
  id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
}>;

export type ProductMutationMutation = {
  __typename?: "Mutation";
  createProduct: {
    __typename?: "Product";
    id: string;
    name?: Maybe<string>;
    isDone?: Maybe<boolean>;
  };
};

export type AttachMealToProductMutationMutationVariables = Exact<{
  ingredients?: Maybe<Array<Maybe<IngredientInput>> | Maybe<IngredientInput>>;
}>;

export type AttachMealToProductMutationMutation = {
  __typename?: "Mutation";
  attachMealToProductMutation?: Maybe<{
    __typename?: "Product";
    id: string;
    name?: Maybe<string>;
  }>;
};

export type ProductCompleteMutationMutationVariables = Exact<{
  id: Scalars["ID"];
  value?: Maybe<Scalars["Boolean"]>;
}>;

export type ProductCompleteMutationMutation = {
  __typename?: "Mutation";
  completeProduct: {
    __typename?: "Product";
    id: string;
    isDone?: Maybe<boolean>;
  };
};

export type ProductListOrderMutationMutationVariables = Exact<{
  newList?: Maybe<Array<Maybe<ProductInput>> | Maybe<ProductInput>>;
}>;

export type ProductListOrderMutationMutation = {
  __typename?: "Mutation";
  updateListOrderMutation?: Maybe<
    Array<{
      __typename?: "Product";
      id: string;
      name?: Maybe<string>;
      isDone?: Maybe<boolean>;
    }>
  >;
};

export type ProductListCancelMutationMutationVariables = Exact<{
  [key: string]: never;
}>;

export type ProductListCancelMutationMutation = {
  __typename?: "Mutation";
  cancelProductList?: Maybe<string>;
};

export type ProductDeleteMutationMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ProductDeleteMutationMutation = {
  __typename?: "Mutation";
  deleteProduct?: Maybe<{ __typename?: "Product"; id: string }>;
};

export type UserDataQueryVariables = Exact<{ [key: string]: never }>;

export type UserDataQuery = {
  __typename?: "Query";
  userDashboard: {
    __typename?: "UserDashboard";
    username?: Maybe<string>;
  };
};

export type MealListQueryVariables = Exact<{ [key: string]: never }>;

export type MealListQuery = {
  __typename?: "Query";
  meals?: Maybe<
    Array<{
      __typename?: "Meal";
      id: string;
      name?: Maybe<string>;
      ingredients?: Maybe<
        Array<Maybe<{ __typename?: "Ingredients"; name: string }>>
      >;
    }>
  >;
};

export type ProductListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ProductListQuery = {
  __typename?: "Query";
  products?: Maybe<
    Array<{
      __typename?: "Product";
      id: string;
      name?: Maybe<string>;
      isDone?: Maybe<boolean>;
    }>
  >;
  meals?: Maybe<
    Array<{
      __typename?: "Meal";
      id: string;
      name?: Maybe<string>;
      ingredients?: Maybe<
        Array<Maybe<{ __typename?: "Ingredients"; name: string }>>
      >;
    }>
  >;
};

export type MealDropDownListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MealDropDownListQuery = {
  __typename?: "Query";
  meals?: Maybe<
    Array<{
      __typename?: "Meal";
      id: string;
      name?: Maybe<string>;
      ingredients?: Maybe<
        Array<Maybe<{ __typename?: "Ingredients"; name: string }>>
      >;
    }>
  >;
};
