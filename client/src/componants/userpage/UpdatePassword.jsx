import React from "react";
import { Formik, Form } from "formik";
import { changePassword } from "../../schemas/schema";
import { CustomInput } from "../CustomInput";
import { useAuth } from "../../contexts/authentication";

function UpdatePassword(props) {
  const { updatePassword } = useAuth();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  function onSubmit(values, actions) {
    updatePassword(
      {
        password: values.password,
        confirmPassword: values.confirmPassword,
        id: props.user.id,
      },
      actions
    );
  }

  return (
    <div className="w-[380px]  flex flex-col items-center md:items-start justify-center gap-[40px] pl-[5%]">
      <h1 className="h-[44px]  text-head2 font-bold text-white">
        Reset password
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={changePassword}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex flex-col justify-center items-center gap-[40px]">
            <div className="flex">
              <div className="flex flex-col gap-[36px]">
                <div className="flex flex-col gap-[24px]">
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
                  className={`w-[182px] h-[48px]  text-body1M font-bold rounded-[4px] 
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
  );
}

export default UpdatePassword;
