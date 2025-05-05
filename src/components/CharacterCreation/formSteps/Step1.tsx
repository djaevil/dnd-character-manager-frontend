import { FC } from "react";
import { FormikProps } from "formik";
import { CharacterFormValues } from "../CharacterFormValues";

interface Props {
  formik: FormikProps<CharacterFormValues>;
}

const basicInfoFields: (keyof CharacterFormValues)[] = [
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
          <label className="form-label text-capitalize" htmlFor={field}>
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
