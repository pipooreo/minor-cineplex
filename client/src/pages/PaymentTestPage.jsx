import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
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
  const [movie, setMovie] = useState();
  const [cardOwner, setCardOwner] = useState("");
  const [countdownDate, setCountdownDate] = useState(null);
  const [countDownPopUp, setCountDownPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // เพิ่ม state สำหรับเก็บคูปอง
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0); // state สำหรับเก็บค่าลดราคา
  const [method, setMethod] = useState("CreditCard");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [cardError, setCardError] = useState("");
  const [ownerError, setOwnerError] = useState("");
  const [expiryError, setexpiryError] = useState("");
  const [cvcError, setcvcError] = useState("");

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError("Card number is not valid");
    } else {
      setCardError("");
    }
  };

  const username = user.name;

  const handleOwnerChange = (event) => {
    const value = event.target.value;
    setOwnerError(""); // Clear any previous error
    setCardOwner(value);
    // console.log("card owrner", cardOwner);
  };

  const handleExpiryDateChange = (event) => {
    if (event.error) {
      setexpiryError("Expiry date is not valid");
    } else {
      setexpiryError("");
    }
  };

  const handleCVCChange = (event) => {
    if (event.error) {
      setcvcError("CVC is not valid");
    } else {
      setcvcError("");
    }
  };

  const Options = {
    style: {
      base: {
        color: "#fff", // Text color
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4", // Placeholder text color
        },
      },
      invalid: {
        color: "#fff",
        iconColor: "#fff",
      },
    },
  };

  async function getMovie() {
    // console.log(params);

    let movieData = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/payment?cinema=${
        params.cinema
      }&movie=${params.title}&hall=${params.hall}&time=${
        params.time
      }&select_date=${params.date}&users_id=${user.id}`
    );
    // console.log("Movie_Data: ", movieData.data.data);
    setMovie(movieData.data.data);

    const [hours, minutes, seconds] = movieData.data.data[0].booking_time
      .split(":")
      .map(Number);
    const bookingDate = new Date();
    bookingDate.setHours(hours);
    bookingDate.setMinutes(minutes);
    bookingDate.setSeconds(seconds);

    const endTime = bookingDate.getTime() + 5 * 60 * 1000;
    setCountdownDate(endTime);
  }

  useEffect(() => {
    getMovie();
  }, []);

  const handleSubmitQR = async (e) => {
    e.preventDefault();
    console.log("user", user);
    const cardOwner = user.name;
    // const paymentMethod = "QR";

    const amount = movie[0].seat_number.length * 150 - discount;
    const email = movie[0].email;
    const userid = user.id;

    if (!couponCode) {
      navigate("/payment/qr", {
        state: {
          amount,
          paymentMethodId: user.id,
          email,
          userid,
          username,
          cinema: params.cinema,
          movie: params.title,
          select_date: params.date,
          time: params.time,
          hall: params.hall,
          seats: movie[0].seat_number,
        },
      });
    } else {
      navigate("/payment/qr", {
        state: {
          amount,
          paymentMethodId: user.id,
          username,
          email,
          userid,
          couponCode,
          cinema: params.cinema,
          movie: params.title,
          select_date: params.date,
          time: params.time,
          hall: params.hall,
          seats: movie[0].seat_number,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // console.log("Stripe or Elements is not loaded.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

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
        const amount = (movie[0].seat_number.length * 150 - discount) * 100;
        const name = cardOwner;
        const email = movie[0].email;

        const response = await axios.post("http://localhost:4000/payment", {
          amount,
          paymentMethodId: id,
          name,
          email,
        });
        // console.log("response: ", response);

        if (response.data.success) {
          if (!couponCode) {
            await axios.put("http://localhost:4000/payment", {
              user: user.id,
              cinema: params.cinema,
              movie: params.title,
              select_date: params.date,
              time: params.time,
              hall: params.hall,
              seats: movie[0].seat_number,
              payment_id: response.data.paymentId,
            });
          } else {
            await axios.put("http://localhost:4000/payment", {
              user: user.id,
              cinema: params.cinema,
              movie: params.title,
              select_date: params.date,
              time: params.time,
              hall: params.hall,
              seats: movie[0].seat_number,
              payment_id: response.data.paymentId,
              coupon: couponCode,
            });
          }

          // console.log(update_payment);
          // console.log("Success Payment");
          // console.log("moviekub: ", movie);

          navigate(
            `/paymentsuccess/${movie[0].title}/${movie[0].cinema_name}/${movie[0].select_date}/${movie[0].hall_number}/${movie[0].time}`
          );
        }
      } catch (error) {
        if (cardOwner !== user.id) {
          setOwnerError("user not match");
        } else {
          console.log("error catch: ", error);
        }
      }
    } else {
      console.log("error: ", error.message);
    }
  };

  const handleDeleteData = async (movie) => {
    try {
      const delete_payment = await axios.delete(
        "http://localhost:4000/payment",
        {
          data: {
            user: user.id,
            cinema: params.cinema,
            movie: params.title,
            select_date: params.date,
            time: params.time,
            hall: params.hall,
            seats: movie[0].seat_number,
          },
        }
      );
      if (delete_payment.status === 200) {
        setCountDownPopUp(true);
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.log("Error deleting booking:", error);
    }
  };

  const handleTimeOut = () => {
    navigate(
      `/seat/${params.title}/${params.cinema}/${params.date}/${params.hall}/${params.time}`
    );
    // setCountDownPopUp(false);
  };

  const handleCouponChange = async (e) => {
    const code = e.target.value;
    setCouponCode(code);

    if (code.length === 8) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/coupons?coupon_code=${code}`
        );
        const coupon = response.data;

        // check type of coupon
        if (coupon.type === "percentage") {
          //ex couponname : ARHMHAMXDDD
          setDiscount(
            (movie[0].seat_number.length * 150 * coupon.discount_value) / 100
          );
        } else if (coupon.type === "fixed") {
          setDiscount(coupon.discount_value);
        }

        setCouponError("");
      } catch (error) {
        setCouponError("Invalid coupon");
        setDiscount(0);
      }
    } else {
      setDiscount(0);
      setCouponError("");
    }
  };

  const renderSelectedSeats = () => {
    const seatNumbers = movie && movie[0].seat_number;
    if (!seatNumbers) return null; // ตรวจสอบว่ามีค่า seatNumbers หรือไม่

    const rows = seatNumbers.reduce((rows, seatNumber, index) => {
      if (index % 4 === 0) rows.push([]);
      rows[rows.length - 1].push(seatNumber);
      return rows;
    }, []);

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex flex-col items-end gap-1">
        <div key={rowIndex} className="flex gap-1">
          <span className="inline-block p-[1px_6px] bg-blue-500 text-white text-center rounded-[4px] text-sm">
            {row.join(", ")}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full ">
      <form onSubmit={handleSubmit}>
        <div className="bg-BG ">
          <div className="h-[80px] bg-BG max-md:h-[48px]"></div>
          <header className="bg-gray-0 h-[106px] flex justify-center items-center gap-[190px] max-md:gap-[80px]">
            <button className="flex flex-col items-center w-[140px]">
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
        <fieldset className="flex max-xl:flex-col  gap-10 justify-evenly max-md:items-center bg-BG  md:p-[80px_120px_80px_120px] lg:justify-between">
          <form className="flex flex-col w-[60%] gap-4 h-full max-xl:w-full text-2xl leading-[30px] max-md:px-[16px] max-md:pt-[40px] max-md:pb-[40px]">
            <div className="font-bold flex text-[24px] gap-5 pb-4">
              <button
                type="button"
                className={`h-[38px]  leading-[30px] ${
                  method === "CreditCard"
                    ? "bg-blue-500 text-white border-b border-gray-200"
                    : "text-gray-300"
                }  active:text-white active:underline`}
                onClick={() => setMethod("CreditCard")}
              >
                Credit card
              </button>
              <button
                type="button"
                className={`h-[38px] leading-[30px]
                   ${
                     method === "QR"
                       ? "bg-blue-500 text-white border-b border-gray-200"
                       : "text-gray-300"
                   }`}
                onClick={() => setMethod("QR")}
              >
                QR Code
              </button>
            </div>

            {method === "CreditCard" && (
              <div className="bg-BG grid grid-cols-2 max-lg:grid-cols-1 gap-[40px]">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px]">
                    Card Number
                  </label>
                  <CardNumberElement
                    options={Options}
                    onChange={handleCardChange}
                    className={`text-gray-300 p-[12px_12px_12px_16px] h-12 bg-gray-100 border w-full rounded-md ${
                      cardError ? "border-[#F34335]" : "border-gray-200"
                    }`}
                  />
                  {cardError && (
                    <div className="text-[#F34335] mt-2">{cardError}</div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px]">
                    Card Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Card owner name"
                    onChange={handleOwnerChange}
                    className={`p-[12px_12px_12px_16px] placeholder-gray-300 text-[white] bg-gray-100 border w-full rounded-md h-[48px] ${
                      ownerError ? "border-[#F34335]" : "border-gray-200"
                    }`}
                  />
                  {ownerError && (
                    <div className="text-[#F34335] mt-2"> {ownerError} </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px]">
                    Expiration Date
                  </label>
                  <CardExpiryElement
                    options={Options}
                    onChange={handleExpiryDateChange}
                    className={`text-gray-300 p-[12px_12px_12px_16px] h-12 bg-gray-100 border w-full rounded-md ${
                      expiryError ? "border-[#F34335]" : "border-gray-200"
                    }`}
                  />
                  {expiryError && (
                    <div className="text-[#F34335] mt-2">{expiryError}</div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-[16px] leading-[24px]">
                    CVC
                  </label>
                  <CardCvcElement
                    options={Options}
                    onChange={handleCVCChange}
                    className={`text-gray-300 p-[12px_12px_12px_16px] h-12 bg-gray-100 border w-full rounded-md ${
                      cvcError ? "border-[#F34335]" : "border-gray-200"
                    }`}
                  />
                  {cvcError && (
                    <div className="text-[#F34335] mt-2">{cvcError}</div>
                  )}
                </div>
              </div>
            )}

            {method === "QR" && (
              <div className="w-[100%] bg-gray-100 text-gray-400 h-[80%] p-[40px_24px_40px_24px] flex justify-center items-center">
                {/* {console.log("method", method)} */}
                {/* {console.log("coupon used", couponCode)} */}
                QR Code Payment
              </div>
            )}
          </form>

          {/* ส่วนของงการโชว์ข้อมูลที่จองหนัง */}
          <div className="flex xl:w-[30%] w-[100%] flex-col max-xl:justify-evenly pt-4 bg-gray-0 rounded-t-[8px]">
            <div className="flex flex-col w-[100%] max-xl:w-[50%] max-xl:justify-center max-md:w-[100%] text-white px-[16px] pb-[24px] gap-[24px]">
              {movie && (
                <div className="flex flex-col gap-[12px] w-[100%]">
                  {countdownDate && (
                    <Countdown
                      date={countdownDate}
                      onComplete={() => handleDeleteData(movie)}
                      intervalDelay={0}
                      precision={3}
                      renderer={({ minutes, seconds }) => (
                        <div className="flex gap-[8px]">
                          <div>Time remaining: </div>
                          <span>
                            {` ${minutes.toString().padStart(2, "0")}:${seconds
                              .toString()
                              .padStart(2, "0")}`}
                          </span>
                        </div>
                      )}
                    />
                  )}

                  <div className="flex gap-[12px]">
                    <img
                      className="w-[82.21px] h-[120px] rounded-[4px]"
                      src={movie[0].image}
                    />
                    <div className="flex flex-col justify-center gap-[8px]">
                      <div className="font-bold text-[20px] ">
                        {movie[0].title}
                      </div>
                      <div className="flex gap-[8px] flex-wrap">
                        {movie[0].genres.map((genres, index_genres) => (
                          <div
                            className="bg-gray-100 text-gray-300 text-body2R rounded-[4px] px-[6px] py-[12px]"
                            key={index_genres}
                          >
                            {genres}
                          </div>
                        ))}
                        <div className="bg-gray-100 text-gray-400 text-body2M rounded-[4px] px-[6px] py-[12px]">
                          {movie[0].language}
                        </div>
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
                  <div className="flex-col w-[40%] justify-end">
                    {renderSelectedSeats()}
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div>Payment Method</div>
                  <div> Credit card</div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#ca2d2d]">
                    <div>Coupon</div>
                    <div>- THB{discount}</div>
                  </div>
                )}

                <div className="flex justify-between">
                  <div>Total</div>
                  <div>
                    THB
                    {(movie && movie[0].seat_number.length * 150) - discount}
                  </div>
                </div>
              </div>

              <input
                type="text"
                placeholder="Coupon"
                value={couponCode}
                onChange={handleCouponChange}
                className="p-[12px_12px_12px_16px] placeholder-gray-300 bg-gray-100 border border-gray-200 w-full rounded-md h-[48px]"
              />

              {couponError && (
                <p className="text-[#F34335] text-sm">{couponError}</p>
              )}

              <button
                className="btn bg-blue-100 border-blue-100 hover:bg-blue-200 active:bg-blue-300 hover:border-blue-200 active:border-blue-300 text-[white]"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Next
              </button>

              {/* Popup Dialog */}
              {showModal && (
                <div className="modal modal-open bg-gray-100 ">
                  <div className="modal-box bg-gray-100 w-11/12 max-w-sm flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg text-head4">
                      Confirm booking
                    </h3>
                    <p className="py-4 text-gray-400 ">
                      Confirm booking and payment?
                    </p>
                    <div className="flex justify-center gap-5">
                      <form method="dialog" className="flex gap-5">
                        <button
                          className="btn border w-[139.5px] bg-gray-100  border-gray-300 hover:bg-gray-300 active:bg-gray-400 text-white rounded-[4px] text-body1M "
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn text-body1M w-[139.5px] rounded-[4px] bg-blue-100 border-blue-100 hover:bg-blue-200 active:bg-blue-300 hover:border-blue-200 active:border-blue-300  text-white"
                          type="button"
                          onClick={(e) => {
                            if (method === "CreditCard") {
                              handleSubmit(e);
                              setShowModal(false);
                            } else if (method === "QR") {
                              handleSubmitQR(e);
                            }
                          }}
                        >
                          Confirm
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Popup Dialog */}
          {countDownPopUp && (
            <div className="modal modal-open bg-gray-100">
              <div className="modal-box bg-gray-100 w-[343px] flex flex-col items-center gap-[16px]">
                <h3 className="font-bold text-[20px] text-[white]">
                  Booking expired
                </h3>
                <p className="text-[14px] text-center text-gray-400">
                  You did not complete the checkout process in time, please
                  start again
                </p>
                <button
                  className="btn w-[100%] bg-blue-100 border-blue-100 font-bold text-[16px] text-[white]"
                  onClick={handleTimeOut}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}
