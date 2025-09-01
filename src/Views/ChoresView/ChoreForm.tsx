import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "Components/Button";
import Input from "Components/Input";
import useMutation from "Hooks/useMutation";
import useQuery from "Hooks/useQuery";
import {
  CHORE_CREATE_MUTATION,
  CHORE_SAVE_MUTATION,
} from "Schema/mutations/chore.mutations";
import { CHORE_LIST_DATA } from "Schema/queries/chore.queries";
import Loader from "Components/Loader";
import ErrorHandler from "Components/ErrorHandler";
import style from "./style.scss";

const ChoreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [choreName, setChoreName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [createChore, createChoreData] = useMutation(CHORE_CREATE_MUTATION);
  const [saveChore, saveChoreData] = useMutation(CHORE_SAVE_MUTATION);

  const { loading, error, data } = useQuery(CHORE_LIST_DATA, {
    skip: !id, // Only fetch if we're in edit mode
  });

  const isEdit = !!id;

  // Prefill chore name when in edit mode
  useEffect(() => {
    if (isEdit && data?.chores) {
      const chore = data.chores.find((c) => c.id === id);
      if (chore?.name) {
        setChoreName(chore.name);
      }
    }
  }, [isEdit, data, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!choreName.trim()) return;

    setIsSubmitting(true);

    if (isEdit) {
      await saveChore({
        variables: {
          id,
          name: choreName.trim(),
        },
        update: () => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/chores");
          }, 1500);
        },
      });
    } else {
      await createChore({
        variables: {
          name: choreName.trim(),
        },
        update: () => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/chores");
          }, 1500);
        },
      });
    }
  };

  const handleCancel = () => {
    navigate("/chores");
  };

  if (isEdit && loading) return <Loader />;
  if (isEdit && error) return <ErrorHandler error={error} />;

  return (
    <>
      <Helmet title={`${isEdit ? "Edit" : "Create"} Chore | Imli`} />
      <div className={style.choreFormContainer}>
        <div className={style.choreFormWrapper}>
          <h2 className={style.choreFormTitle}>
            {isEdit ? "Edit Chore" : "Create New Chore"}
          </h2>
          <form onSubmit={handleSubmit} className={style.choreForm}>
            <div className={style.choreFormField}>
              <label htmlFor="choreName">Chore Name</label>
              <Input
                id="choreName"
                type="text"
                value={choreName}
                onChange={(e) => setChoreName(e.target.value)}
                placeholder="Enter chore name"
                required
              />
            </div>
            {isSuccess && (
              <p className={style.addSuccessful}>
                {isEdit
                  ? "Chore updated successfully!"
                  : "Chore created successfully!"}
              </p>
            )}
            <div className={style.choreFormButtons}>
              <Button
                type="button"
                buttonStyle="hollow"
                onClick={handleCancel}
                isDisabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                buttonStyle="prime"
                isDisabled={isSubmitting || !choreName.trim()}
              >
                {isSubmitting
                  ? "Saving..."
                  : isEdit
                  ? "Update Chore"
                  : "Create Chore"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChoreForm;
