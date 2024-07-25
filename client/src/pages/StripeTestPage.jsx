import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentTest from "./PaymentTestPage";

const PLUBLIC_KEY =
  "pk_test_51PfOyVRsVxHSwh1BgieeOpwtzfJs13MS3FEuMB0GXJDk5oL5r4PcCpZujoeGJZZXLocBTcEwI0qOLbdxoEccbkGj00oYNrgx2N";

const stripeTestPromise = loadStripe(PLUBLIC_KEY);

export default function StripeTest() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentTest />
    </Elements>
  );
}
