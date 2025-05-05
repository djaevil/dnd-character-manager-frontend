import { FormikProps } from "formik";
import { Character } from "../../../models/CharacterModel";

const Step3 = ({ formik }: { formik: FormikProps<Character> }) => (
  <div>
    {["equipment", "spells", "features"].map((field) => (
      <div key={field} className="form-group mb-4">
        <label className="form-label" htmlFor={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
        <input
          type="text"
          id={field}
          className="form-control"
          placeholder={`Comma-separated list (e.g. item1, item2)`}
          value={formik.values[
            field as "equipment" | "spells" | "features"
          ].join(", ")}
          onChange={(e) =>
            formik.setFieldValue(
              field,
              e.target.value.split(",").map((item) => item.trim())
            )
          }
        />
      </div>
    ))}
  </div>
);

export default Step3;
