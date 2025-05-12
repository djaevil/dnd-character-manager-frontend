import Step1 from "./formSteps/Step1";
import Step2 from "./formSteps/Step2";
import Step3 from "./formSteps/Step3";
import Step4 from "./formSteps/Step4";
import { FormikProps } from "formik";
import { Character } from "../../models/CharacterModel";

interface Props {
  step: number;
  formik: FormikProps<Character>;
}

const CharacterFormSteps = ({ step, formik }: Props) => {
  switch (step) {
    case 1:
      return <Step1 formik={formik} />;
    case 2:
      return <Step2 formik={formik} />;
    case 3:
      return <Step3 formik={formik} />;
    case 4:
      return <Step4 formik={formik} />;
    default:
      return null;
  }
};

export default CharacterFormSteps;
