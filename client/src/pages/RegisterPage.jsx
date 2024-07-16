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
    <div className="bg-gray-900">
      <section className="w-full absolute h-screen flex flex-col items-center justify-center  bg-gray-0">
        <div className="w-[380px] h-[512px] flex flex-col items-center justify-center gap-[40px] max-sm:w-[375px]">
          <h1 className="h-[44px] text-[36px] font-bold text-white">
            Register
          </h1>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col justify-center items-center gap-[40px]">
                <div className="flex flex-col gap-[24px]">
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
                  disabled={isSubmitting}
                  className="btn btn-primary bg-blue-100 h-[48px] w-[383px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
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
