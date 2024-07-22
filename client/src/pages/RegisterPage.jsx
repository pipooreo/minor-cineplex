import React from "react";
import { Formik, Form } from "formik";
import { registerSchema } from "../schemas/schema";
import { CustomInput } from "../componants/CustomInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function RegisterPage() {
  const nevigate = useNavigate();
  const { register } = useAuth();
  async function onSubmit(values, actions) {
    register(values, actions);
  }
  return (
    <div>
      <section className="w-full absolute md:py-[400px]  h-screen flex flex-col items-center justify-center bg-BG">
        <div className="w-[380px]  flex flex-col items-center justify-center gap-[40px] max-sm:w-[375px]">
          <h1 className="h-[44px] text-head2  font-bold text-white">
            Register
          </h1>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="flex flex-col justify-center items-center gap-[40px]">
                <div className="flex flex-col gap-[15px] ">
                  <CustomInput
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                  />
                  <CustomInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
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
                  type="submit"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-1 text-body2R">
            <p className="text-gray-300">Already have an account?</p>
            <button
              className="underline text-white"
              onClick={() => nevigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
