import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentTest from "./PaymentTestPage";
import QRcode from "./QRcode";
const PUBLIC_KEY = `${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeQr() {
  return (
    <Elements stripe={stripeTestPromise}>
      <QRcode />
    </Elements>
  );
}
