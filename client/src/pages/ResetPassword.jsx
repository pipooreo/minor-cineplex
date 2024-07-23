import React from "react";
import { Formik, Form } from "formik";
import { requestOtp, resetPasswordWithOtp } from "../schemas/schema";
import { CustomInput } from "../componants/CustomInput";
import { useAuth } from "../contexts/authentication";

function ResetPassword() {
  const { requestResetPassword, resetPassword } = useAuth();

  function sendOtp(values, actions) {
    requestResetPassword({ email: values.email }, actions);
  }
  function onSubmit(values, actions) {
    resetPassword(
      {
        password: values.password,
        confirmPassword: values.confirmPassword,
        otp: values.otp,
      },
      actions
    );
  }
  return (
    <section className="w-full absolute h-screen md:py-[450px] flex flex-col items-center justify-center  bg-BG ">
      <div className="w-[380px] flex flex-col items-center justify-center gap-[40px] max-md:w-xs">
        <h1 className="h-[44px] text-head2 font-bold text-white">
          Reset password
        </h1>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={requestOtp}
          onSubmit={sendOtp}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="flex flex-col justify-center items-center gap-[40px]">
              <div className="flex flex-col gap-[24px]">
                <CustomInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <button
                  disabled={isSubmitting || !(isValid && dirty)}
                  className={`w-[380px] h-[48px]  text-body1M font-bold rounded-[4px] 
                    transition-all duration-300 ease-in-out
                    ${
                      isValid && dirty
                        ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                        : "bg-blue-100/40 text-white/40 cursor-not-allowed"
                    }
                    max-sm:w-[343px]`}
                >
                  Send OTP
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            otp: "",
          }}
          validationSchema={resetPasswordWithOtp}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="flex flex-col justify-center items-center gap-[40px]">
              <div className="flex">
                <div className="flex flex-col gap-[36px]">
                  <div className="flex flex-col gap-[24px]">
                    <CustomInput
                      label="OTP Verify"
                      name="otp"
                      type="text"
                      placeholder="OTP number"
                      maxLength="6"
                    />
                    <CustomInput
                      label="New password"
                      name="password"
                      type="password"
                      placeholder="New password"
                    />
                    <CustomInput
                      label="Confirm new password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    // disabled={isSubmitting}
                    disabled={isSubmitting || !(isValid && dirty)}
                    className={`w-[380px] h-[48px]  text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out
                                ${
                                  isValid && dirty
                                    ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                                    : "bg-blue-100/40 text-white/40 cursor-not-allowed"
                                }
                                max-sm:w-[343px]`}
                    type="submit"
                  >
                    Reset password
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default ResetPassword;
