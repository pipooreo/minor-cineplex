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
import { useNavigate } from "react-router-dom";

export default function PaymentTest() {
  const [success, setSuccess] = useState(false);
  const [movie, setMovie] = useState();
  const [cardOwner, setCardOwner] = useState("");

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const Options = {
    style: {
      base: {
        color: "#fff", // Text color
        fontSize: "16px",
        height: "24px",
        padding: "12px 16px 12px 12px",
        "::placeholder": {
          color: "#aab7c4", // Placeholder text color
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  async function getMovie() {
    console.log(params);

    let movieData = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/payment?cinema=${
        params.cinema
      }&movie=${params.title}&hall=${params.hall}&time=${
        params.time
      }&select_date=${params.date}&users_id=${user.id}`
    );
    console.log("Datakub: ", movieData.data.data);
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
      // billing_details: {
      //   name,
      //   email,
      // },
    });
    // console.log(paymentMethod);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const amount = movie[0].seat_number.length * 150 * 100;
        const name = cardOwner;
        const email = movie[0].email;

        const response = await axios.post("http://localhost:4000/payment", {
          amount,
          id,
          name,
          email,
        });
        // console.log(response);
        console.log("amount", amount);
        console.log("id", id);
        console.log("name", name);
        console.log("email", email);
        if (response.data.success) {
          const update_payment = await axios.put(
            "http://localhost:4000/payment",
            {
              user: user.id,
              cinema: params.cinema,
              movie: params.title,
              select_date: params.date,
              time: params.time,
              hall: params.hall,
              seats: movie[0].seat_number,
            }
          );
          console.log(update_payment);
          console.log("Success Payment");
          setSuccess(true);

          navigate("/payment/success");
        }
      } catch (error) {
        console.log("Erorr", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full ">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div className="bg-BG ">
            <div className="h-[80px] bg-BG max-md:h-[48px]"></div>
            <header className="bg-gray-0 h-[106px] flex justify-center items-center gap-[190px] max-md:gap-[80px]">
              <button
                className="flex flex-col items-center w-[140px]"
                onClick={() => navigate(-2)}
              >
                <FaCheck className="w-[44px] h-[44px] bg-blue-300  rounded-full text-white p-3 " />
                <p className="text-white text-[16px] max-md:text-[14px]">
                  Select showtime
                </p>
              </button>
              <button
                className="flex flex-col items-center w-[140px] absolute z-10 "
                onClick={() => navigate(-1)}
              >
                <FaCheck className="w-[44px] h-[44px] bg-blue-300  rounded-full text-white p-3 " />
                <p className="text-white text-[16px] max-md:text-[14px]">
                  Select seat
                </p>
              </button>
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
          <fieldset className="border-[3px] border-red flex max-xl:flex-col  gap-10 justify-evenly max-md:items-center bg-BG  md:p-[80px_120px_80px_120px] lg:justify-between">
            <div className="flex flex-col w-[60%] gap-4 h-full max-xl:w-full text-2xl  leading-[30px] max-md:px-[16px] max-md:pt-[40px] max-md:pb-[40px]">
              <div className="font-bold flex w-[100%] text-[24px] gap-5 ">
                <button className="text-white [100%] h-[38px]">
                  Credit card
                </button>
                <button className="text-white [100%] h-[38px]">QR Code</button>
              </div>

              <div className="bg-BG  grid grid-cols-2 max-lg:grid-cols-1 gap-[40px] ">
                <div className=" flex flex-col  gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px] ">
                    Card Number
                  </label>
                  <CardNumberElement
                    options={Options}
                    className="p-[12px_12px_12px_16px] h-12 text-gray-300 bg-gray-100 border border-gray-200 w-full rounded-md " // Adjust padding and width
                  />
                </div>
                <div className=" flex flex-col  gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px] h-[24px]">
                    Card Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Card owner name "
                    onChange={(e) => setCardOwner(e.target.value)}
                    className=" p-[12px_12px_12px_16px] placeholder-gray-300 text-[white] bg-gray-100 border border-gray-200 w-full rounded-md h-[48px]"
                  />
                </div>
                <div className="flex flex-col  gap-2 ">
                  <label className="text-gray-400 text-[16px] leading-[24px] h-[24px] ">
                    Expiration Date
                  </label>

                  <CardExpiryElement
                    options={Options}
                    className="text-gray-300 p-[12px_12px_12px_16px] h-12 bg-gray-100 border border-gray-200 w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col  gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px] h-[24px]  ">
                    CVC
                  </label>
                  <CardCvcElement
                    options={Options}
                    className="text-gray-300 p-[12px_12px_12px_16px] h-12 bg-gray-100 border border-gray-200 w-full rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* ส่วนของงการโชว์ข้อมูลที่จองหนัง */}
            <div className="flex max-md:w-[85%] max-sm:w-[100%] lg:flex-col md:flex-row xs:flex-col max-xl:justify-evenly pt-4 bg-gray-0">
              <div className="flex flex-col w-[100%] max-xl:w-[50%] max-xl:justify-center max-md:w-[100%] text-white px-[16px] pb-[24px] pt-[16px] gap-[24px] h-[304px] rounded-t-[8px]">
                {movie && (
                  <div className=" flex items-center gap-[12px] w-[100%]">
                    <img
                      className="w-[82.21px] h-[120px] rounded-[4px]"
                      src={movie[0].image}
                    />
                    <div className="flex flex-col gap-[8px]">
                      <div className="font-bold text-[20px] ">
                        {movie[0].title}
                      </div>
                      <div className="flex gap-[8px] flex-wrap">
                        {movie[0].genres.map((genres, index_genres) => (
                          <div
                            className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-300"
                            key={index_genres}
                          >
                            {genres}
                          </div>
                        ))}
                        <div className="bg-gray-100 rouned-[4px] p-[6px_12px] text-gray-400 font-medium">
                          {movie[0].language}
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
              <div className="text-white  flex flex-col gap-[20px] px-[16px] pt-[16px] pb-[24px] rounded-b-[8px] bg-gray-0">
                <div className="">
                  <div className=" border-t-[1px] max-lg:hidden pb-4"></div>
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
                  <div className="flex justify-between ">
                    <div>Payment Method</div>
                    <div> Credit card</div>
                  </div>
                  <div className="flex justify-between">
                    <div>total</div>
                    <div>THB{movie && movie[0].seat_number.length * 150}</div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Coupon"
                  className="p-[12px_12px_12px_16px] placeholder-gray-300 bg-gray-100 border border-gray-200 w-full rounded-md h-[48px]"
                />
                <button className="border-[1px] text-white">Next</button>
              </div>
            </div>
          </fieldset>
        </form>
      ) : (
        <div>
          <h2>Good</h2>
        </div>
      )}
    </div>
  );
}
