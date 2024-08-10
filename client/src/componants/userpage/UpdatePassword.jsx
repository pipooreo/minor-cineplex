import React from "react";
import { Formik, Form } from "formik";
import { changePassword } from "../../schemas/schema";
import { CustomInput } from "../CustomInput";
import { useAuth } from "../../contexts/authentication";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePassword(props) {
  const { updatePassword } = useAuth();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const notify = () => {
    toast.success("Your password has been successfully updated", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  async function onSubmit(values, actions) {
    const result = await updatePassword({
      password: values.password,
      confirmPassword: values.confirmPassword,
      id: props.user.id,
    });
    if (result.status == 200) {
      notify();
      actions.resetForm();
    }
  }

  return (
    <div className="xl:w-[500px] flex flex-col items-start  justify-center gap-[40px]  px-[5%] sm:px-[20%] md:px-[25%] lg:px-[5%]">
      <h1 className="h-[44px] text-center text-head2 font-bold text-white">
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
                                transition-all duration-300 ease-in-out border-[1px] border-gray-300
                                ${
                                  isValid && dirty
                                    ? " hover:bg-gray-300 active:bg-gray-200 text-white"
                                    : "opacity-40 text-gray-400 cursor-not-allowed"
                                }
                                max-sm:w-[343px]`}
                  type="submit"
                >
                  Reset password
                </button>
              </div>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              limit={1}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition:Bounce
              // className="w-[30%]"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdatePassword;
