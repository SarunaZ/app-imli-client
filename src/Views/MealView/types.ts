import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";

export interface IngredientsInput {
  __typename?: string;
  name: string;
}

export type Meals = DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
