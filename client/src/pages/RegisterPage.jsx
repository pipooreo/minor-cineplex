import React from "react";
import { Formik, Form } from "formik";
import { registerSchema } from "../schemas/schema";
import { CustomInput } from "../componants/CustomInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const nevigate = useNavigate();
  async function onSubmit(values, actions) {
    // console.log(values);
    // console.log(actions);
    try {
      await axios.post("http://localhost:4000/auth/register", values);
      nevigate("/register/success");
    } catch {
      actions.resetForm();
    }
  }
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center max-[375px]:w-[375px]">
      <div className="w-[380px] h-[512px] flex flex-col items-center justify-center gap-[40px] max-[375px]:w-[375px]">
        <h1 className="w-[121px] h-[44px] text-[36px] font-bold text-white">
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
                className="btn btn-primary h-[48px] w-[383px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-[375px]:w-[343px]"
                type="submit"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex gap-1 text">
          <p className="text-[color:[hsla(227, 19%, 62%, 1)]]">
            Already have an account?
          </p>
          <button
            className="underline text-white"
            onClick={() => nevigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
