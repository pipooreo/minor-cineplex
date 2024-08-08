import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useStripe } from "@stripe/react-stripe-js";

// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function QRcode() {
  const [qrValue, setQrValue] = useState("");
  const [ownerError, setOwnerError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

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
  } = location.state;
  useEffect(() => {
    // Check if stripe is loaded before calling handleQr
    if (stripe) {
      handleQr();
    }
  }, [stripe]);
  async function handleQr() {
    const response = await axios.post(
      "http://localhost:4000/payment/process-payment",
      {
        amount: amount,
        currency: "thb",
        payment_method_types: "promptpay",
        // payment_method: "paymentMethodId",
        email: email,
      }
    );

    const clientSecret = response.data.paymentIntent.client_secret;
    const check = await stripe.confirmPromptPayPayment(clientSecret, {
      payment_method: {
        type: "promptpay",
        billing_details: {
          email: "beammy@gmail.com",
        },
      },
    });
    console.log("check", check);
    console.log("status", check.paymentIntent.status);
    const handleDeleteData = async (movie) => {
      try {
        const delete_payment = await axios.delete(
          "http://localhost:4000/payment",
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
          setCountDownPopUp(true);
        } else {
          console.error("Failed to delete booking");
        }
      } catch (error) {
        console.log("Error deleting booking:", error);
      }
    };

    if (check.paymentIntent.status === "succeeded") {
      if (!couponCode) {
        await axios.put("http://localhost:4000/payment/qr", {
          user: userid,
          cinema: cinema,
          movie: movie,
          select_date: select_date,
          time: time,
          hall: hall,
          seats: seats,
          payment_id: username,
        });
      } else {
        await axios.put("http://localhost:4000/payment/qr", {
          user: userid,
          cinema: cinema,
          movie: movie,
          select_date: select_date,
          time: time,
          hall: hall,
          seats: seats,
          payment_id: username,
          coupon: couponCode,
        });
      }
      navigate(
        `/paymentsuccess/${movie}/${cinema}/${select_date}/${hall}/${time}`
      );
    } else {
      handleDeleteData(movie);
      console.log("lol");
      navigate(`/seat/${movie}/${cinema}/${select_date}/${hall}/${time}`);
    }
  }

  return (
    <div
      className="bg-[#101525] w-full h-screen"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="pt-20 h-[100%] text-white  flex flex-col justify-center items-center">
        <div className="p-[40px_24px_40px_24px] bg-gray-100 w-[50%] h-[70%]  flex flex-col justify-center items-center">
          {/* <h1>QR Code Payment</h1> */}
          {/* {ownerError && <p>{ownerError}</p>} */}
          <div>
            <button
              className="w-40"
              // onClick={handleQr}
            >
              Loading QR code...
            </button>
          </div>
          {/* <p>Amount: {amount}</p>
          {qrValue ? (
            <QRCode value={qrValue} size={256} level="H" />
          ) : (
            <p>Loading QR code...</p>
          )} */}
          {/* <p>Email: {email}</p>
          <p>Coupon: {couponCode}</p>
          <p>User: {userid}</p>
          <p>Username: {username}</p>
          <p>Cinema: {cinema}</p>
          <p>Movie: {movie}</p>
          <p>Date: {select_date}</p>
          <p>Time: {time}</p>
          <p>Hall: {hall}</p>
          <p>Seats: {seats}</p> */}
        </div>
      </div>
    </div>
  );
}

export default QRcode;
