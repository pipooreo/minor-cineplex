import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import Navbar from "../componants/Navbar";

function RegisterPageSuccess() {
  const nevigate = useNavigate();
  return (
    <div className="bg-[#101525;]">
      <section className="w-full h-screen flex flex-col items-center justify-center max-[375px]:w-[375px]">
        <div className="w-[380px] h-[512px] flex flex-col items-center justify-center gap-[48px] align-center max-[375px]:w-[375px]">
          <div>
            <FaCheck className="w-[80px] h-[80px] bg-green-700 rounded-full text-white p-3 " />
          </div>
          <div className="w-[350px] h-[80px] flex flex-col items-center justify-center gap-[12px] align-center max-[375px]:w-[302px]">
            <h1 className="w-[350px] h-[44px] text-[36px] font-bold text-white align-center max-[375px]:w-[343px]">
              Registration success
            </h1>
            <p className="text-gray-400 text-[14px] w-[300px] h-[24px] align-center p-1 max-[375px]:w-[282px]">
              Your account has been successfully created!
            </p>
          </div>
          <button
            className="btn btn-primary h-[48px] w-[380px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-[375px]:w-[343px]"
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
