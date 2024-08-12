import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

function RegisterPageSuccess() {
  const nevigate = useNavigate();
  return (
    <div className="bg-BG" style={{ fontFamily: "Roboto Condensed" }}>
      <section className="w-full h-screen absolute flex flex-col items-center justify-center bg-BG">
        <div className=" w-full flex flex-col items-center justify-center gap-[48px]">
          <div className="flex flex-col gap-[24px] items-center justify-center">
            <FaCheck className="w-[80px] h-[80px] bg-green rounded-full text-white p-3 " />
          </div>
          <div className="h-[80px] flex flex-col items-center justify-center gap-[12px] text-center">
            <h1 className=" h-[44px] text-[36px] font-bold text-white text-center">
              Registration success
            </h1>
            <p className="text-gray-400 text-body2R h-[24px] text-center">
              Your account has been successfully created!
            </p>
          </div>
          <button
            className="btn bg-blue-100 border-blue-100 hover:bg-blue-200 active:border-blue-300 hover:border-blue-200 active:bg-blue-300 h-[48px] w-[380px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
            type="text"
            onClick={() => nevigate("/")}
          >
            Back to home
          </button>
        </div>
      </section>
    </div>
  );
}
export default RegisterPageSuccess;
