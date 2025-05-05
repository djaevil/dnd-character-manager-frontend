import { useState } from "react";
import { useFormik } from "formik";
import { initialCharacter } from "./characterInitialValues";
import { characterFormSchema } from "./characterFormSchema";
import { Character } from "../../models/CharacterModel";
import CharacterFormSteps from "./CharacterFormSteps";

interface Props {
  onClose: () => void;
  initialValues?: Character;
  onSubmit?: (values: Character) => void;
  isEditing?: boolean;
}

const CharacterCreationModal = ({
  onClose,
  initialValues,
  onSubmit,
  isEditing,
}: Props) => {
  const [step, setStep] = useState(1);

  const formik = useFormik<Character>({
    initialValues: initialValues || initialCharacter,
    validationSchema: characterFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit?.(values);
      } catch (error) {
        console.error("Error submitting character:", error);
      } finally {
        setSubmitting(false);
        onClose();
      }
    },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <div className="modal-backdrop show" />
      <div className="modal show d-block">
        <div className="modal-dialog modal-lg">
          <form className="modal-content p-4" noValidate>
            <h3>{isEditing ? "Edit character" : "Create character"}</h3>

            <CharacterFormSteps step={step} formik={formik} />

            <div className="d-flex justify-content-between mt-4">
              {step === 1 ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onClose}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                >
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={formik.isSubmitting}
                  onClick={() => {
                    if (formik.isValid && !formik.isSubmitting) {
                      formik.handleSubmit();
                    }
                  }}
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CharacterCreationModal;
