import withModal, { ModalProps } from "HOC/withModal";
import style from "./style.scss";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import { useState } from "react";
import Button from "Components/Button";
import classnames from "classnames";

interface Props extends ModalProps {
  mealData: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

interface State {
  tab: "instructions" | "ingredients";
}

const MealPreviewModal = ({ mealData }: Props) => {
  const [state, setState] = useState<State>({
    tab: mealData.instructions ? "instructions" : "ingredients",
  });

  const ingredientsButtonClasses = classnames(style.mealPreviewModalButton, {
    [style.active]: state.tab === "ingredients",
  });

  const instructionsButtonClasses = classnames(style.mealPreviewModalButton, {
    [style.active]: state.tab === "instructions",
  });

  return (
    <div className={style.mealPreviewWrapper}>
      <div className={style.mealPreviewModalButtons}>
        {mealData.instructions && (
          <Button
            buttonStyle="none"
            className={instructionsButtonClasses}
            onClick={() => setState({ tab: "instructions" })}
          >
            {"Recipe"}
          </Button>
        )}
        <Button
          buttonStyle="none"
          className={ingredientsButtonClasses}
          onClick={() => setState({ tab: "ingredients" })}
        >
          {"Ingredients"}
        </Button>
      </div>
      {state.tab === "ingredients" && (
        <ol className={style.mealPreviewModalIngredients}>
          {mealData.ingredients.map((ingredient) => (
            <li key={ingredient.name}>{ingredient.name}</li>
          ))}
        </ol>
      )}
      {state.tab === "instructions" && (
        <div
          className={style.mealPreviewModalContent}
          dangerouslySetInnerHTML={{ __html: mealData.instructions }}
        />
      )}
    </div>
  );
};
export default withModal(MealPreviewModal);
