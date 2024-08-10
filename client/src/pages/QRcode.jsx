import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import Countdown from "react-countdown";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useStripe } from "@stripe/react-stripe-js";

// import { loadStripe } from "@stripe/stripe-js";
function QRcode() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [remainingTime, setRemainingTime] = useState(null);
  const [countDownPopUp, setCountDownPopUp] = useState(false);
  const stripe = useStripe();
  const {
    amount,
    email,
    userid,
    username,
    cinema,
    movie,
    select_date,
    time,
    hall,
    seats,
    couponCode,
    countdownDate,
  } = location.state;
  const handleDeleteData = async (movie) => {
    try {
      const delete_payment = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/payment`,
        {
          data: {
            user: userid,
            cinema: cinema,
            movie: movie,
            select_date: select_date,
            time: time,
            hall: hall,
            seats: seats,
            payment_id: username,
          },
        }
      );
      if (delete_payment.status === 200) {
        // setCountDownPopUp(true);
        navigate(`/seat/${movie}/${cinema}/${select_date}/${hall}/${time}`);
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.log("Error deleting booking:", error);
    }
  };
  useEffect(() => {
    // Check if stripe is loaded before calling handleQr
    setRemainingTime(countdownDate);
    // console.log("remainig Tiem", setRemainingTime);
    if (stripe) {
      handleQr();
    }
  }, [stripe]);
  async function handleQr() {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/payment/process-payment`,
      {
        amount: amount,
        email: email,
      }
    );

    const clientSecret = response.data.paymentIntent.client_secret;
    const paymentIntentId = response.data.paymentIntent.id;
    const check = await stripe.confirmPromptPayPayment(clientSecret, {
      payment_method: {
        type: "promptpay",
        billing_details: {
          email: email,
        },
      },
    });
    // console.log("check", check);
    // console.log("status", check.paymentIntent.status);

    if (check.paymentIntent.status === "succeeded") {
      if (!couponCode) {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/payment/qr`, {
          user: userid,
          cinema: cinema,
          movie: movie,
          select_date: select_date,
          time: time,
          hall: hall,
          seats: seats,
          payment_id: paymentIntentId,
        });
      } else {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/payment/qr`, {
          user: userid,
          cinema: cinema,
          movie: movie,
          select_date: select_date,
          time: time,
          hall: hall,
          seats: seats,
          payment_id: paymentIntentId,
          coupon: couponCode,
        });
      }
      navigate(
        `/paymentsuccess/${movie}/${cinema}/${select_date}/${hall}/${time}`
      );
    } else {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/payment`, {
        data: {
          user: userid,
          cinema: cinema,
          movie: movie,
          select_date: select_date,
          time: time,
          hall: hall,
          seats: seats,
          payment_id: paymentIntentId,
        },
      });
      navigate(`/seat/${movie}/${cinema}/${select_date}/${hall}/${time}`);
    }
  }
  const handleTimeOut = () => {
    navigate(`/seat/${movie}/${cinema}/${select_date}/${hall}/${time}`);
    // setCountDownPopUp(false);
  };
  return (
    <div
      className="bg-BG w-full h-screen absolute"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="pt-20 h-[100%] text-white  flex flex-col justify-center items-center">
        <div className="p-[40px_24px_40px_24px] bg-gray-100 w-[50%] h-[70%]  flex flex-col justify-center items-center">
          <div>
            <button className="w-40">Loading QR code...</button>
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
          </div>
          {countDownPopUp && (
            <div className="modal modal-open bg-gray-100 z-[999]">
              {console.log}
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
        </div>
      </div>
    </div>
  );
}

export default QRcode;
