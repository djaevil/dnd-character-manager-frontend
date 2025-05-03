import { useState } from "react";
import { useFormik } from "formik";
import { initialCharacter } from "./characterInitialValues";
import { characterFormSchema } from "./characterFormSchema";
import { CharacterFormValues } from "./CharacterFormValues";
import CharacterFormSteps from "./CharacterFormSteps";

interface Props {
  onClose: () => void;
}

const CharacterCreationModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(1);

  const formik = useFormik<CharacterFormValues>({
    initialValues: initialCharacter,
    validationSchema: characterFormSchema,
    onSubmit: (values) => {
      console.log("Submitted character:", values);
      onClose();
    },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg">
        <form onSubmit={formik.handleSubmit} className="modal-content p-4">
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
              <button type="submit" className="btn btn-success">
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
