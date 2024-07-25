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

export const loginSchema = yup.object().shape({
  email: yup.string().required("Enter your email"),
  password: yup.string().required("Enter your password"),
  remember: yup.boolean(),
});

export const requestOtp = yup.object().shape({
  email: yup.string().required("Enter your email").required("Required"),
});

export const resetPasswordWithOtp = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Please create a strong password (a-z,A-Z,0-9)",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
  otp: yup
    .number()
    .typeError("OTP must be a number")
    .required("Required")
    .integer("OTP is number only")
    .positive("OTP is number only"),
  // .max(9999, "OTP have 4 numbers"),
});

export const profile = yup.object().shape({
  name: yup.string().min(8, "Name is least 8 length").required("Required"),
  email: yup.string().required("Enter your email").required("Required"),
});
