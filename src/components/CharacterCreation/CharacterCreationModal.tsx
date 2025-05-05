import { useState } from "react";
import { useFormik } from "formik";
import { initialCharacter } from "./characterInitialValues";
import { characterFormSchema } from "./characterFormSchema";
import { CharacterFormValues } from "./CharacterFormValues";
import CharacterFormSteps from "./CharacterFormSteps";
import { createCharacter } from "../../api/character.api";
import Swal from "sweetalert2";

interface Props {
  onClose: () => void;
}

const CharacterCreationModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(1);

  const formik = useFormik<CharacterFormValues>({
    initialValues: initialCharacter,
    validationSchema: characterFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const characterData = { ...values };
        const { data } = await createCharacter(characterData);
        if (data) {
          Swal.fire({
            icon: "success",
            theme: "dark",
            title: "Character created successfully",
            text: "Your character has been created.",
            confirmButtonColor: "#ffc107",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Character creation failed",
            text: "Please try again.",
            confirmButtonColor: "#dc3545",
          });
        }
      } catch (error) {
        console.error("Error creating character:", error);
      }
      setSubmitting(false);
      onClose();
    },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg">
        <form className="modal-content p-4" noValidate>
          <h3>Create Character</h3>

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
                className="btn btn-primary"
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
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreationModal;
