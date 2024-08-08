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
    if (check.paymentIntent.status) {
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

      // console.log(update_payment);
      // console.log("Success Payment");

      navigate(
        `/paymentsuccess/${movie}/${cinema}/${select_date}/${hall}/${time}`
      );
    }
  }

  //   useEffect;
  //   const handleNavigation = () => {
  //     navigate("/payment/QrResult", {
  //       state: {
  //         amount,
  //         email,
  //         userid,
  //         username,
  //         cinema,
  //         movie,
  //         select_date,
  //         time,
  //         hall,
  //         seats,
  //         ...(couponCode ? { couponCode } : {}),
  //       },
  //     });
  //   };

  return (
    <div
      className="bg-[#101525] w-full h-screen"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="pt-20 h-[100%] text-white flex flex-col justify-center items-center">
        <h1>QR Code Payment</h1>
        {ownerError && <p>{ownerError}</p>}
        <div>
          <button className="w-40" onClick={handleQr}>
            Hi!
          </button>
        </div>
        <p>Amount: {amount}</p>
        {qrValue ? (
          <QRCode value={qrValue} size={256} level="H" />
        ) : (
          <p>Loading QR code...</p>
        )}
        <p>Email: {email}</p>
        <p>Coupon: {couponCode}</p>
        <p>User: {userid}</p>
        <p>Username: {username}</p>
        <p>Cinema: {cinema}</p>
        <p>Movie: {movie}</p>
        <p>Date: {select_date}</p>
        <p>Time: {time}</p>
        <p>Hall: {hall}</p>
        <p>Seats: {seats}</p>
      </div>
    </div>
  );
}

export default QRcode;
