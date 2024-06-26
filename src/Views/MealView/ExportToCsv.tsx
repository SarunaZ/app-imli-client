import { DeepExtractType } from "Declarations/typeExtract";
import useState from "Hooks/useState";
import { MealListQuery } from "Schema/types";
import React from "react";
import { CSVLink } from "react-csv";
import Download from "Images/icons/download.svg";
import style from "./style.scss";

interface State {
  formatedData: string | Record<string, string | object>[];
}

interface Props {
  mealData: DeepExtractType<MealListQuery, ["meals"]>;
}

const ExportToCsv = ({ mealData }: Props) => {
  const [state, setState] = useState<State>({
    formatedData: "",
  });

  const onExport = () => {
    const formatedData = mealData.map((meal) => ({
      name: meal.name,
      ingredients: meal.ingredients.map((ingredient) => ingredient.name),
      instructions: meal.instructions,
    }));

    if (formatedData && formatedData) {
      setState({ formatedData });
    }
  };

  return (
    <CSVLink
      asyncOnClick
      onClick={onExport}
      data={state.formatedData}
      filename={`meal-export-${new Date().getTime()}`}
      className={style.mealExportButton}
    >
      <Download height={25} />
    </CSVLink>
  );
};

export default ExportToCsv;
