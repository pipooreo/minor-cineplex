import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
export const registerSchema = yup.object().shape({
  name: yup.string().min(8, "Name is least 8 length").required("Required"),
  email: yup
    .string()
    .email("Please enter a format email (example@example.com)")
    .required("Required"),
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Please create a strong password (a-z,A-Z,0-9)",
    })
    .required("Required"),
});
