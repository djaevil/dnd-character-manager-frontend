import { FC } from "react";
import { FormikProps } from "formik";
import { Character } from "../../../models/CharacterModel";

interface Props {
  formik: FormikProps<Character>;
}

const basicInfoFields: (keyof Character)[] = [
  "name",
  "race",
  "class",
  "level",
  "healthPoints",
  "background",
];

const Step1: FC<Props> = ({ formik }) => {
  return (
    <>
      <h5>Basic Info</h5>
      {basicInfoFields.map((field) => (
        <div className="mb-3" key={field}>
          <label
            className={`form-label text-capitalize ${
              ["race", "class", "background"].includes(field) ? "" : "required"
            }`}
            htmlFor={field}
          >
            {field}
          </label>
          <input
            type={["level", "healthPoints"].includes(field) ? "number" : "text"}
            id={field}
            name={field}
            value={formik.values[field] as string | number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched[field] && formik.errors[field] ? "is-invalid" : ""
            }`}
          />
          {formik.touched[field] && formik.errors[field] && (
            <div className="invalid-feedback">
              {typeof formik.errors[field] === "string"
                ? formik.errors[field]
                : ""}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Step1;
