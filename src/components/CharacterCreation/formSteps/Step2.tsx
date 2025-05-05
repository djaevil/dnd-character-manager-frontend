import { FC } from "react";
import { FormikProps } from "formik";
import { CharacterFormValues } from "../CharacterFormValues";

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
  formik: FormikProps<CharacterFormValues>;
}

const Step2: FC<Props> = ({ formik }) => {
  return (
    <div>
      <h4>Stats</h4>
      {stats.map((stat) => (
        <div key={stat} className="form-group mb-2">
          <label
            className="form-label text-capitalize"
            htmlFor={`stats.${stat}`}
          >
            {stat}
          </label>
          <input
            type="number"
            id={`stats.${stat}`}
            className={`form-control ${
              formik.touched.stats?.[
                stat as keyof CharacterFormValues["stats"]
              ] &&
              formik.errors.stats?.[stat as keyof CharacterFormValues["stats"]]
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps(`stats.${stat}`)}
          />
          {formik.touched.stats?.[stat as keyof CharacterFormValues["stats"]] &&
            formik.errors.stats?.[
              stat as keyof CharacterFormValues["stats"]
            ] && (
              <div className="invalid-feedback">
                {typeof formik.errors.stats?.[
                  stat as keyof CharacterFormValues["stats"]
                ] === "string"
                  ? formik.errors.stats?.[
                      stat as keyof CharacterFormValues["stats"]
                    ]
                  : ""}
              </div>
            )}
        </div>
      ))}

      <h4 className="mt-4">Skills</h4>
      {skills.map((skill) => (
        <div key={skill} className="form-group mb-2">
          <label
            className="form-label text-capitalize"
            htmlFor={`skills.${skill}`}
          >
            {skill}
          </label>
          <input
            type="number"
            id={`skills.${skill}`}
            className={`form-control ${
              formik.touched.skills?.[
                skill as keyof CharacterFormValues["skills"]
              ] &&
              formik.errors.skills?.[
                skill as keyof CharacterFormValues["skills"]
              ]
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps(`skills.${skill}`)}
          />
          {formik.touched.skills?.[
            skill as keyof CharacterFormValues["skills"]
          ] &&
            formik.errors.skills?.[
              skill as keyof CharacterFormValues["skills"]
            ] && (
              <div className="invalid-feedback">
                {typeof formik.errors.skills?.[
                  skill as keyof CharacterFormValues["skills"]
                ] === "string"
                  ? formik.errors.skills?.[
                      skill as keyof CharacterFormValues["skills"]
                    ]
                  : ""}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Step2;
