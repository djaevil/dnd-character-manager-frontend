import { FormikProps } from "formik";
import { CharacterFormValues } from "../CharacterFormValues";

const Step4 = ({ formik }: { formik: FormikProps<CharacterFormValues> }) => (
  <div className="form-group">
    <label className="" htmlFor="notes">
      Notes
    </label>
    <textarea
      id="notes"
      className="form-control"
      rows={5}
      {...formik.getFieldProps("notes")}
    />
  </div>
);

export default Step4;
