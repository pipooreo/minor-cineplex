import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";

function QrResult() {
  const [ownerError, setOwnerError] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userJA = jwtDecode(token);
  const {
    amount,
    paymentMethodId,
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
  } = location.state || {}; // Set default to empty object to avoid destructuring null


  useEffect(() => {
    if (stripe && elements) {
      const submitQr = async () => {
        try {
          console.log("userJa", userJA);
          console.log("userJa", userJA.id);
          //   const cardNumberElement = elements.getElement(CardNumberElement);

          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "promptpay",
            // card: cardNumberElement,
          });

          if (!error) {
            const { id } = paymentMethod;
            const amountInCents = amount * 100; // amount in cents
            const name = username;

            // Make the initial payment request
            const response = await axios.post("http://localhost:4000/payment", {
              amount: amountInCents,
              paymentMethodId: id,
              name,
              email,
            });

            if (response.data.success) {
              const paymentData = {
                user: userid,
                cinema,
                movie,
                select_date,
                time,
                hall,
                seats,
              };
              console.log("fuck you");
              if (couponCode) {
                paymentData.coupon = couponCode;
              }

              // Update payment data after successful payment
              await axios.put("http://localhost:4000/payment", paymentData);
              navigate("/payment/success");
            }
          } else {
            console.log("Stripe error:", error.message);
          }
        } catch (error) {
          if (username !== userJA.name) {
            setOwnerError("User not match");
          } else {
            console.log("Error:", error);
          }
        } finally {
          setLoading(false); // Stop loading when done
        }
      };

      submitQr();
    }
  }, [
    stripe,
    elements,
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
    navigate,
  ]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting for stripe and elements
  }

  return (
    <div
      className="bg-[#101525] w-full h-full"
      style={{ fontFamily: "Roboto Condensed" }}
    >
      <div className="pt-20 text-white">
        <h1>Processing Payment...</h1>
        {ownerError && <p>{ownerError}</p>}
        <p>Loading XD</p>
        <div className="pt-20 text-white">
          <h1>QR Code Payment</h1>
          {ownerError && <p>{ownerError}</p>}
          <p>Amount: {amount}</p>
          <p>Payment Method Id: {paymentMethodId}</p>
          <p>username: {username}</p>
          <p>userId: {userid}</p>
          <p>Email: {email}</p>
          <p>Coupon: {couponCode}</p>
          <p>User: {userid}</p>
          {/* <p>UserJWT: {userJA}</p>
          <p>UserJWT.id: {userJA.id}</p> */}
          <p>Cinema: {cinema}</p>
          <p>Movie: {movie}</p>
          <p>Date: {select_date}</p>
          <p>Time: {time}</p>
          <p>Hall: {hall}</p>
          <p>Seats: {seats}</p>
        </div>
      </div>
    </div>
  );
}

export default QrResult;
