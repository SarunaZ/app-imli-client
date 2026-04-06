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

const ChoreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [choreName, setChoreName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [createChore] = useMutation(CHORE_CREATE_MUTATION);
  const [saveChore] = useMutation(CHORE_SAVE_MUTATION);

  const { loading, error, data } = useQuery(CHORE_LIST_DATA, { skip: !id });
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && data?.chores) {
      const chore = data.chores.find((c) => c.id === id);
      if (chore?.name) setChoreName(chore.name);
    }
  }, [isEdit, data, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!choreName.trim()) return;

    setIsSubmitting(true);

    const mutation = isEdit ? saveChore : createChore;
    const variables = isEdit
      ? { id, name: choreName.trim() }
      : { name: choreName.trim() };

    await mutation({
      variables,
      update: () => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => navigate("/chores"), 1500);
      },
    });
  };

  if (isEdit && loading) return <Loader />;
  if (isEdit && error) return <ErrorHandler error={error} />;

  return (
    <>
      <Helmet title={`${isEdit ? "Edit" : "Create"} Chore | Imli`} />
      <div className="mx-auto max-w-xl px-5">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-bold text-text">
            {isEdit ? "Edit Chore" : "Create New Chore"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="choreName" className="text-sm font-medium text-text">
                Chore Name
              </label>
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
              <p className="text-center text-sm text-success">
                {isEdit ? "Chore updated successfully!" : "Chore created successfully!"}
              </p>
            )}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                buttonStyle="hollow"
                onClick={() => navigate("/chores")}
                isDisabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                buttonStyle="prime"
                isDisabled={isSubmitting || !choreName.trim()}
              >
                {isSubmitting ? "Saving..." : isEdit ? "Update Chore" : "Create Chore"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChoreForm;
