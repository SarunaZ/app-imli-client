import { DeepExtractTypeSkipArrays } from "Declarations/typeExtract";
import { MealListQuery } from "Schema/types";
import style from "./style.scss";
import AddMealForm from "Views/MealView/AddMealForm";
import Input from "Components/Input";
import { ElementRef, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  mealData?: DeepExtractTypeSkipArrays<MealListQuery, ["meals"]>;
  onChange: () => void;
}

const MealForm = ({ mealData, onChange }: Props) => {
  console.log(mealData);
  const mealInputRef = useRef<ElementRef<"input">>(null);
  const mealEditorRef = useRef(null);

  return (
    <div className={style.mealFormContainer}>
      <Input
        required
        label="Meal name"
        name="productName"
        ref={mealInputRef}
        defaultValue={mealData?.name}
      />
      <div className={style.mealEditor}>
        <Editor
          apiKey={process.env.CLIENT_TINY_MCE_EDITOR_KEY}
          onInit={(_evt, editor) => (mealEditorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <AddMealForm
        onChange={onChange}
        isEdit={!!mealData}
        mealData={mealData}
      />
    </div>
  );
};

export default MealForm;
