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

const Step2 = ({ formik }: { formik: FormikProps<CharacterFormValues> }) => (
  <div>
    <h3 className="">Stats</h3>
    {stats.map((stat) => (
      <div key={stat} className="form-group mb-2">
        <label className="" htmlFor={`stats.${stat}`}>
          {stat}
        </label>
        <input
          type="number"
          id={`stats.${stat}`}
          className="form-control"
          {...formik.getFieldProps(`stats.${stat}`)}
        />
      </div>
    ))}

    <h3 className=" mt-4">Skills</h3>
    {skills.map((skill) => (
      <div key={skill} className="form-group mb-2">
        <label className="" htmlFor={`skills.${skill}`}>
          {skill}
        </label>
        <input
          type="number"
          id={`skills.${skill}`}
          className="form-control"
          {...formik.getFieldProps(`skills.${skill}`)}
        />
      </div>
    ))}
  </div>
);

export default Step2;
