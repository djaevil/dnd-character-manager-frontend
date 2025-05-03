import * as Yup from "yup";

export const characterFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  race: Yup.string().required("Required"),
  class: Yup.string().required("Required"),
  level: Yup.number().min(1).required("Required"),
  healthPoints: Yup.number().min(1).required("Required"),
  background: Yup.string().required("Required"),
});
