import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

function RefundPageSuccess() {
  const nevigate = useNavigate();
  const params = useParams();
  return (
    <div className="bg-BG" style={{ fontFamily: "Roboto Condensed" }}>
      <section className="w-full h-screen absolute flex flex-col items-center justify-center bg-BG">
        <div className=" w-full flex flex-col items-center justify-center gap-[48px] align-center">
          <div className="flex flex-col gap-[24px] items-center justify-center">
            <FaCheck className="w-[80px] h-[80px] bg-green rounded-full text-white p-3 " />

            <h1 className="text-head2 text-white text-center">
              Cancellation successful
            </h1>
          </div>
          <div className=" flex flex-col items-center justify-center gap-[12px] text-center">
            <div className="flex flex-col h-[100px] gap-[26px] text-white">
              <p className="text-gray-400 text-body2R h-[24px] text-center">
                The cancellation is complete.
                <br />
                You will receive an email with detail refund within 48 hours.
              </p>
              <p className="text-center text-body2R">
                Total refund{" "}
                <span className="text-body1M">THB{params.price}</span>
              </p>
            </div>
          </div>
          <button
            className="btn bg-blue-100 border-blue-100 hover:bg-blue-200 active:bg-blue-300 hover:border-blue-200 active:border-blue-300 h-[48px] w-[380px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
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
export default RefundPageSuccess;
