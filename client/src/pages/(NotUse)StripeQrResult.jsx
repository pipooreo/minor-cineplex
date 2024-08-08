import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import QrResult from "./QrResult";
const PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeQrResult() {
  return (
    <Elements stripe={stripeTestPromise}>
      <QrResult />
    </Elements>
  );
}
