import { FormikProps } from "formik";
import { Character } from "../../../models/CharacterModel";

const Step4 = ({ formik }: { formik: FormikProps<Character> }) => (
  <div className="form-group">
    <label className="form-label" htmlFor="notes">
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
