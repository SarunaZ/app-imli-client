import withModal, { ModalProps } from "HOC/withModal";
import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import { useState } from "react";
import Button from "Components/Button";

interface Props extends ModalProps {
  mealData: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
}

const MealPreviewModal = ({ mealData }: Props) => {
  const [tab, setTab] = useState<"instructions" | "ingredients">(
    mealData.instructions ? "instructions" : "ingredients",
  );

  return (
    <div className="flex w-full max-w-lg flex-col sm:min-h-[500px] sm:min-w-[500px]">
      <div className="mb-5 flex gap-2">
        {mealData.instructions && (
          <Button
            buttonStyle="none"
            className={`rounded-full border border-text px-4 py-1.5 text-sm transition-colors ${
              tab === "instructions" ? "bg-text text-text-inv" : "text-text"
            }`}
            onClick={() => setTab("instructions")}
          >
            Recipe
          </Button>
        )}
        {mealData.ingredients && (
          <Button
            buttonStyle="none"
            className={`rounded-full border border-text px-4 py-1.5 text-sm transition-colors ${
              tab === "ingredients" ? "bg-text text-text-inv" : "text-text"
            }`}
            onClick={() => setTab("ingredients")}
          >
            Ingredients
          </Button>
        )}
      </div>

      {tab === "ingredients" && (
        <ol className="list-decimal space-y-2 pl-6 text-sm capitalize text-text">
          {mealData.ingredients?.map((ingredient) => (
            <li key={ingredient.name}>{ingredient.name}</li>
          ))}
        </ol>
      )}

      {tab === "instructions" && (
        <div
          className="flex-1 overflow-auto text-base leading-relaxed text-text [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_ol]:text-sm [&_p]:m-0 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-sm"
          dangerouslySetInnerHTML={{ __html: mealData.instructions }}
        />
      )}
    </div>
  );
};

export default withModal(MealPreviewModal);
