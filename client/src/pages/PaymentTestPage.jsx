import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentTest() {
  const [success, setSuccess] = useState(false);
  const [movie, setMovie] = useState();

  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  async function getMovie() {
    console.log(params);

    let movieData = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/payment?cinema=${
        params.cinema
      }&movie=${params.title}&hall=${params.hall}&time=${
        params.time
      }&select_date=${params.date}&users_id=${user.id}`
    );
    // console.log(movieData.data.data);
    setMovie(movieData.data.data);
  }

  useEffect(() => {
    getMovie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Elements is not loaded.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    // const cardExpiryElement = elements.getElement(CardExpiryElement);
    // const cardCvcElement = elements.getElement(CardCvcElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });
    console.log(paymentMethod);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount,
          id,
        });

        if (response.data.success) {
          console.log("Success Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Erorr", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div className="bg-BG">
            <div className="h-[80px] bg-BG max-md:h-[48px]"></div>
            <header className="bg-gray-0 h-[106px] flex justify-center items-center gap-[190px] max-md:gap-[80px]">
              <div className="flex flex-col items-center w-[140px]">
                <FaCheck className="w-[44px] h-[44px] bg-blue-300  rounded-full text-white p-3 " />
                <p className="text-white text-[16px] max-md:text-[14px]">
                  Select showtime
                </p>
              </div>
              <div className="flex flex-col items-center w-[140px] absolute z-10">
                <FaCheck className="w-[44px] h-[44px] bg-blue-300  rounded-full text-white p-3 " />
                <p className="text-white text-[16px] max-md:text-[14px]">
                  Select seat
                </p>
              </div>
              <div className="flex flex-col items-center w-[140px]">
                <div className="w-[44px] h-[44px] bg-blue-100 rounded-full text-white text-center pt-[9px] border-gray-100 border">
                  3
                </div>
                <p className="text-white text-[16px] max-md:text-[14px]">
                  Payment
                </p>
              </div>
              <hr className="w-[287px] absolute mb-[20px] border-gray-100 max-md:w-[176px]" />
            </header>
          </div>
          <fieldset className="border-[3px] border-red bg-gray-100 p-10 flex">
            <div className="flex flex-col">
              <div className="flex gap-[16px]">
                <button className="text-white">Credit card</button>
                <button className="text-white">QR Code</button>
              </div>
              <div className="bg-gray-400 w-[793px] grid grid-cols-2 gap-[40px]">
                <div>
                  <label>Card Number</label>
                  <CardNumberElement />
                </div>
                <div className="flex flex-col">
                  <label>Card Owner</label>
                  <input type="text" placeholder="Name on Card" />
                </div>
                <div>
                  <label>Expiration Date</label>
                  <CardExpiryElement />
                </div>
                <div>
                  <label>CVC</label>
                  <CardCvcElement />
                </div>
              </div>
            </div>

            {/* ส่วนของงการโชว์ข้อมูลที่จองหนัง */}
            <div className="max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
              <div className="flex flex-col w-[320px] text-white pr-[16px] pb-[24px] pt-[16px] gap-[24px] bg-gray-0 h-[304px] rounded-t-[8px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
                {movie && (
                  <div className=" flex items-center gap-[12px]">
                    <img
                      className="w-[82.21px] h-[120px] rounded-[4px]"
                      src={movie[0].image}
                    />
                    <div className="flex flex-col gap-[8px]">
                      <div className="font-bold text-[20px] ">
                        {movie[0].title}
                      </div>
                      <div className="flex  gap-[8px] flex-wrap">
                        <div className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-400 font-medium">
                          {movie.language}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-[8px]">
                  <div className="flex gap-[12px] items-center">
                    <i className="fa-solid fa-location-dot w-[16px] h-[16px] text-gray-200"></i>
                    <p className="text-gray-400">
                      {movie && movie[0].cinema_name}
                    </p>
                  </div>
                  <div className="flex gap-[12px] items-center">
                    <i className="fa-solid fa-calendar-days w-[16px] h-[16px] text-gray-200"></i>
                    <p className="text-gray-400">
                      {movie && movie[0].select_date}
                    </p>
                  </div>
                  <div className="flex gap-[12px] items-center">
                    <i className="fa-solid fa-clock w-[16px] h-[16px] text-gray-200"></i>
                    <p className="text-gray-400">{movie && movie[0].time}</p>
                  </div>
                  <div className="flex gap-[12px] items-center">
                    <i className="fa-solid fa-shop w-[16px] h-[16px] text-gray-200"></i>
                    <p className="text-gray-400">
                      {movie && movie[0].hall_number}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-white border-[#08ff77] border-t-[1px] flex flex-col gap-[20px] px-[16px] pt-[16px] pb-[24px] rounded-b-[8px] bg-gray-0">
                <div>
                  <div className="flex justify-between">
                    <div>Select Seat</div>
                    <div className="flex gap-[5px] flex-wrap w-[40%] justify-end">
                      {movie &&
                        movie[0].seat_number.map((seatNumber, index) => (
                          <p
                            key={index}
                            className="p-[1px_2px] bg-blue-100 text-white rounded-[4px]"
                          >
                            {seatNumber}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Payment Method</div>
                    <div>Credit card</div>
                  </div>
                  <div className="flex justify-between">
                    <div>total</div>
                    <div>{movie && movie[0].seat_number.length * 150}</div>
                  </div>
                </div>
                <input type="text" placeholder="Coupon" />
                <button className="border-[1px] text-white">Pay</button>
              </div>
              {/* {seatStatuses.some((seat) => seat.status === "reserve") && (
                <div className="flex flex-col p-[16px] mt-[-10px] bg-gray-0 max-h-full rounded-[8px] gap-[16px] max-md:w-[375px] max-lg:w-[100%] max-xl:w-[300px]">
                  <div className="flex justify-between">
                    <p className="text-gray-400">Selected Seat</p>
                    <div className="flex gap-[5px] flex-wrap w-[40%] justify-end">
                      {getSeatNumber(seatStatuses).map((seatNumber, index) => (
                        <p
                          key={index}
                          className="p-[1px_2px] bg-blue-100 text-white rounded-[4px]"
                        >
                          {seatNumber}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-400">
                      Tickets: {reservedSeatsCount}
                    </p>
                    <p className=" text-white">THB{totalPrice}</p>
                  </div>
                  <button
                    className="btn btn-primary bg-blue-100 h-[48px] rounded-[8px] text-white"
                    onClick={handleReserveSeat}
                  >
                    Pay THB{totalPrice}
                  </button>
                </div>
              )} */}
            </div>

            <div></div>
          </fieldset>
        </form>
      ) : (
        <div>
          <h2>Good</h2>
        </div>
      )}
    </>
  );
}
