import { FC } from "react";
import { FormikProps } from "formik";
import { Character } from "../../../models/CharacterModel";

const stats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];
const skills = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

interface Props {
  formik: FormikProps<Character>;
}

const Step2: FC<Props> = ({ formik }) => {
  return (
    <div>
      <h4>Stats</h4>
      {stats.map((stat) => (
        <div key={stat} className="form-group mb-2">
          <label
            className="form-label text-capitalize required"
            htmlFor={`stats.${stat}`}
          >
            {stat}
          </label>
          <input
            type="number"
            id={`stats.${stat}`}
            className={`form-control ${
              formik.touched.stats?.[stat as keyof Character["stats"]] &&
              formik.errors.stats?.[stat as keyof Character["stats"]]
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps(`stats.${stat}`)}
          />
          {formik.touched.stats?.[stat as keyof Character["stats"]] &&
            formik.errors.stats?.[stat as keyof Character["stats"]] && (
              <div className="invalid-feedback">
                {typeof formik.errors.stats?.[
                  stat as keyof Character["stats"]
                ] === "string"
                  ? formik.errors.stats?.[stat as keyof Character["stats"]]
                  : ""}
              </div>
            )}
        </div>
      ))}

      <h4 className="mt-4">Skills</h4>
      {skills.map((skill) => (
        <div key={skill} className="form-group mb-2">
          <label
            className="form-label text-capitalize required"
            htmlFor={`skills.${skill}`}
          >
            {skill}
          </label>
          <input
            type="number"
            id={`skills.${skill}`}
            className={`form-control ${
              formik.touched.skills?.[skill as keyof Character["skills"]] &&
              formik.errors.skills?.[skill as keyof Character["skills"]]
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps(`skills.${skill}`)}
          />
          {formik.touched.skills?.[skill as keyof Character["skills"]] &&
            formik.errors.skills?.[skill as keyof Character["skills"]] && (
              <div className="invalid-feedback">
                {typeof formik.errors.skills?.[
                  skill as keyof Character["skills"]
                ] === "string"
                  ? formik.errors.skills?.[skill as keyof Character["skills"]]
                  : ""}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Step2;
