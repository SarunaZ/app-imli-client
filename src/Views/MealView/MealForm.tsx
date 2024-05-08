import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";

interface Props {
  mealData: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

const MealForm = ({ mealData }: Props) => {
  console.log(mealData);
  return <div>test</div>;
};

export default MealForm;
