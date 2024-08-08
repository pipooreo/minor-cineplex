import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  //   const stripe = useStripe();
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

  async function handleqr() {
    // event.preventDefault();
    const stripePromise = loadStripe(
      "pk_test_51PiqC1IuXZ1u9Q7snR0uvFaJVfhxQsOtkyMZSinPppFBlZG2Aip1SasflUKyvgO6exYRiHEsE1VYjFufgFOUe0zk00FFYHm126"
    );
    const stripe = await stripePromise;
    const response = await axios.post(
      "http://localhost:4000/payment/process-payment",
      {
        amount: 300,
        currency: "thb",
        payment_method_types: "promptpay",
        payment_method: "paymentMethodId",
        email: "beammy@gmail.com",
      }
    );
    console.log("response:", response);
    console.log("client_secret", response.data.paymentIntent.client_secret);
    const { qrCodeUrl, creationTime, paymentIntent } = response.data;
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
    if (qrCodeUrl) {
      document.getElementById("qrCode").src = qrCodeUrl; // Display the QR code

      // Set a timeout to hide or refresh the QR code after 1 minute (60000 ms)
      setTimeout(() => {
        document.getElementById("qrCode").style.display = "none"; // Hide QR code
        // Optionally, you could also refresh or request a new QR code here
      }, 6000000000);
    } else {
      console.error("QR code URL not found");
    }
  }

  //   useEffect(() => {
  //     const fetchQRCode = async () => {
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:4000/payment/process-payment",
  //           {
  //             amount, // Amount is already in the smallest currency unit
  //             currency: "THB",
  //             email, // Include the email parameter
  //           }
  //         );

  //         const qrData = response.data.qrCodeUrl; // Retrieve QR code URL from response
  //         console.log("qrData:", qrData);
  //         setQrValue(qrData);
  //       } catch (error) {
  //         console.error("Error fetching QR code:", error);
  //         setOwnerError("Failed to generate QR code.");
  //       }
  //     };

  //     fetchQRCode();
  //   }, [amount, email]);

  //   useEffect(() => {
  //     qrGen();
  //   }, []);

  const handleNavigation = () => {
    navigate("/payment/QrResult", {
      state: {
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
        ...(couponCode ? { couponCode } : {}),
      },
    });
  };

  return (
    <div
      className="bg-[#101525] w-full h-full"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <script src="https://js.stripe.com/v3/"></script>
      <div className="pt-20 text-white">
        <h1>QR Code Payment</h1>
        {ownerError && <p>{ownerError}</p>}
        <div>
          <button className="w-40" onClick={handleqr}>
            Hi!
          </button>
        </div>
        <p>Amount: {amount}</p>
        {qrValue ? (
          <QRCode value={qrValue} size={256} level="H" />
        ) : (
          <p>Loading QR code...</p>
        )}
        {/* <p>check {check}</p> */}
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
