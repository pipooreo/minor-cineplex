import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";

function PaymentPageSuccess() {
  const [dataSuccess, setDataSuccess] = useState([]);

  const params = useParams();
  const nevigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  async function getDataSuccess() {
    // console.log("params :", params);

    let successData = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/payment/success?cinema=${
        params.cinema
      }&movie=${params.title}&hall=${params.hall}&time=${
        params.time
      }&select_date=${params.date}&users_id=${user.id}`
    );
    // console.log("Success_Data: ", successData.data.data);
    setDataSuccess(successData.data.data[0]);
  }
  // console.log("checkdata: ", dataSuccess);

  useEffect(() => {
    getDataSuccess();
  }, []);
  return (
    <div className="bg-BG">
      <section className="w-full h-screen absolute flex flex-col items-center justify-center bg-BG">
        {dataSuccess && (
          <div className="w-[380px] h-[512px] flex flex-col items-center justify-center gap-[48px] align-center max-sm:w-[375px]">
            <div className="flex flex-col items-center">
              <FaCheck className="w-[80px] h-[80px] bg-green rounded-full text-white p-3" />
              <h1 className="text-[36px] font-bold text-white align-center max-sm:w-[343px]">
                Booking success
              </h1>
            </div>
            <div className="w-[386px] text-white rounded-[8px] bg-gray-0 flex flex-col items-center gap-[16px]">
              <div className="w-[100%] p-[24px] flex flex-col gap-[8px]">
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-location-dot w-[16px] h-[16px] text-gray-200"></i>
                  <div>{dataSuccess.cinema_name}</div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-calendar-days w-[16px] h-[16px] text-gray-200"></i>
                  <div>{dataSuccess.select_date}</div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-clock w-[16px] h-[16px] text-gray-200"></i>
                  <div>{dataSuccess.time}</div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-shop w-[16px] h-[16px] text-gray-200"></i>
                  <div>{dataSuccess.hall_number}</div>
                </div>
              </div>
              <hr className="w-[80%]" />
              <div className="w-[100%] text-[16px] p-[24px] flex flex-col gap-[8px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[130px]">Selected Seat</div>
                  <div className="font-[700] font-[Roboto]">
                    {dataSuccess.seat_number &&
                      dataSuccess.seat_number.map((seats, index_seats) => (
                        <span key={index_seats}>
                          {seats}
                          {index_seats < dataSuccess.seat_number.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[130px]">Payment method</div>
                  <div className="font-[700] font-[Roboto]">
                    {dataSuccess.payment_method}
                  </div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[130px]">Total</div>
                  {dataSuccess.coupon_type === "percentage" ? (
                    <div className="font-[700] font-[Roboto]">
                      THB{" "}
                      {dataSuccess.seat_number &&
                        dataSuccess.seat_number.length *
                          150 *
                          (1 - dataSuccess.discount / 100)}
                    </div>
                  ) : (
                    <div className="font-[700] font-[Roboto]">
                      THB{" "}
                      {dataSuccess.seat_number &&
                        dataSuccess.seat_number.length * 150 -
                          dataSuccess.discount}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[100%] grid grid-cols-2 gap-[16px]">
              <button
                className="col-span-1 btn bg-gray-100 hover:bg-blue-200 active:bg-blue-300 h-[48px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
                type="text"
                onClick={() => nevigate("/")}
              >
                Back to home
              </button>
              <button
                className="col-span-1 btn bg-gray-100 hover:bg-blue-200 active:bg-blue-300 h-[48px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold max-sm:w-[343px]"
                type="text"
                onClick={() => nevigate("/")}
              >
                Booking detail
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default PaymentPageSuccess;
