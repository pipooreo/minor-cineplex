import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import ClockLoader from "react-spinners/ClockLoader";

function PaymentPageSuccess() {
  const [dataSuccess, setDataSuccess] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const nevigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  async function getDataSuccess() {
    // console.log("params :", params);
    try {
      setLoading(true);
      let successData = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/payment/success?cinema=${
          params.cinema
        }&movie=${params.title}&hall=${params.hall}&time=${
          params.time
        }&select_date=${params.date}&users_id=${user.id}`
      );
      // console.log("Success_Data: ", successData.data.data);
      setDataSuccess(successData.data.data[0]);
    } catch (error) {
      // console.log("checkdata: ", dataSuccess);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataSuccess();
  }, []);

  if (loading) {
    return (
      <div className="sweet-loading flex justify-center h-screen bg-BG items-center ">
        <ClockLoader color="#4f7cee" />
      </div>
    );
  }
  return (
    <div className="bg-BG">
      <section
        className="w-full h-screen  absolute flex flex-col items-center justify-center bg-BG"
        style={{ fontFamily: "Roboto Condensed" }}
      >
        {dataSuccess && (
          <div className="w-[418px] p-[40px_16px] h-screen flex flex-col items-center justify-center gap-[48px] align-center max-sm:w-[375px]">
            <div className="flex flex-col items-center">
              <FaCheck className="w-[80px] h-[80px] bg-green rounded-full text-white p-3" />
              <h1 className="text-[36px] font-bold text-white align-center">
                Booking success
              </h1>
            </div>
            <div className="w-[100%] text-white rounded-[8px] bg-gray-0 flex flex-col  ">
              <div className=" p-[24px] flex flex-col gap-[8px] text-body1R text-gray-400">
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-location-dot w-[16px] h-[16px] text-gray-300"></i>
                  <div>{dataSuccess.cinema_name}</div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-calendar-days w-[16px] h-[16px] text-gray-300"></i>
                  <div>{dataSuccess.select_date}</div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-clock w-[16px] h-[16px] text-gray-300"></i>
                  <div>{dataSuccess.time}</div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <i className="fa-solid fa-shop w-[16px] h-[16px] text-gray-300"></i>
                  <div>{dataSuccess.hall_number}</div>
                </div>
              </div>
              <hr className="mx-[7%] text-gray-100" />
              <div className=" text-[16px] p-[24px] flex flex-col gap-[8px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[130px] text-body1R text-gray-300">
                    Selected Seat
                  </div>
                  <div className="text-body1M text-white">
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
                  <div className="w-[130px] text-body1R text-gray-300">
                    Payment method
                  </div>
                  <div className="text-body1M text-white">
                    {dataSuccess.payment_method}
                  </div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[130px] text-body1R text-gray-300">
                    Total
                  </div>
                  {dataSuccess.coupon_type === "percentage" ? (
                    <div className="text-body1M text-white">
                      THB{" "}
                      {dataSuccess.seat_number &&
                        dataSuccess.seat_number.length *
                          150 *
                          (1 - dataSuccess.discount / 100)}
                    </div>
                  ) : (
                    <div className="">
                      THB{" "}
                      {dataSuccess.seat_number &&
                        dataSuccess.seat_number.length * 150 -
                          dataSuccess.discount}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <button
                className="w-[164px] md:w-[185px] py-[12px] btn bg-gray-100  border-gray-300 hover:bg-gray-300 active:bg-gray-400 h-[48px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold"
                type="text"
                onClick={() => nevigate("/")}
              >
                Back to home
              </button>
              <button
                className="w-[164px] md:w-[185px] btn py-[12px] bg-blue-100 border-blue-100 hover:bg-blue-200 active:bg-blue-300 hover:border-blue-200 active:border-blue-300 h-[48px] bg-[color:hsla(223, 82%, 62%, 1)]] text-white text-[16px] font-bold"
                type="text"
                onClick={() =>
                  nevigate("/profile", { state: { viewType: "history" } })
                }
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
