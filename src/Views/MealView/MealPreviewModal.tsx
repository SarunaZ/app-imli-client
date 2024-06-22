import withModal, { ModalProps } from "HOC/withModal";
import style from "./style.scss";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";

interface Props extends ModalProps {
  mealData: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

const MealPreviewModal = ({ mealData }: Props) => {
  return (
    <div className={style.mealPreviewModal}>
      <div dangerouslySetInnerHTML={{ __html: mealData.instructions }} />
      <ol>
        {mealData.ingredients.map((ingredient) => (
          <li key={ingredient.name}>{ingredient.name}</li>
        ))}
      </ol>
    </div>
  );
};
export default withModal(MealPreviewModal);
