import { DeepExtractType } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import Download from "Images/icons/download.svg";
import { downloadCsv } from "./DownloadCsv";
import Button from "Components/Button";

interface Props {
  mealData: DeepExtractType<MealListQuery, ["meals"]>;
}

const ExportToCsv = ({ mealData }: Props) => {
  const onExport = () => {
    const formatedData = mealData.map((meal) => ({
      name: meal.name,
      ingredients: meal.ingredients
        .map((ingredient) => ingredient.name)
        .join(","),
      instructions: meal.instructions,
    }));

    downloadCsv(formatedData);
  };

  return (
    <Button onClick={onExport} buttonStyle="none">
      <Download height={25} />
    </Button>
  );
};

export default ExportToCsv;
