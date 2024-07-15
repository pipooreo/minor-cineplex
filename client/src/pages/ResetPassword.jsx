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
    <section className="w-full absolute h-screen flex flex-col items-center justify-center max-sm:w-sm bg-gray-0 max-sm:h-[768px]">
      <div className="w-[380px] flex flex-col items-center justify-center gap-[40px] max-md:w-xs">
        <h1 className="h-[44px] text-[36px] font-bold text-white">
          Reset password
        </h1>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={requestOtp}
          onSubmit={sendOtp}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-center items-center gap-[40px]">
              <div className="flex flex-col gap-[24px]">
                <CustomInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <button className="btn btn-primary bg-blue-100 text-white text-[16px] font-bold">
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
          {({ isSubmitting }) => (
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
                    className="btn btn-primary bg-blue-100 h-[48px] w-[383px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
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
      {/* <div role="alert" className="alert alert-error max-md:w-full mt-[20px]">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <span>Your password is incorrect or email doesn't exits.</span>
        <span>Please try another password or email</span>
      </div> */}
    </section>
  );
}

export default ResetPassword;
