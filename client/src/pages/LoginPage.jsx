import React from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "../schemas/schema";
import { CustomInput, CustomCheckBox } from "../componants/CustomInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const nevigate = useNavigate();
  const { login } = useAuth();

  function onSubmit(values, actions) {
    login(values, actions);
  }

  return (
    <section className="w-full absolute  h-screen flex flex-col items-center justify-center bg-gray-0">
      <div className="w-[380px] h-[512px] flex flex-col items-center justify-center gap-[40px] max-md:w-[375px]">
        <h1 className="h-[44px] text-[36px] font-bold text-white">Login</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
            remember: false,
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-center items-center gap-[40px]">
              <div className="flex flex-col gap-[24px]">
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
                <div className="flex justify-between">
                  <CustomCheckBox name="remember" type="checkbox" />
                  <button
                    className="underline text-white"
                    onClick={() => nevigate("/resetpassword")}
                  >
                    Forget password?
                  </button>
                </div>
              </div>
              <button
                // disabled={isSubmitting}
                className="btn bg-blue-100 btn-primary h-[48px] w-[383px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
                type="submit"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex gap-1 text">
          <p className="text-gray-300">Don’t have any account?</p>
          <button
            className="underline text-white"
            onClick={() => nevigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
