import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentTest from "./PaymentTestPage";

const PLUBLIC_KEY =
  "pk_test_51PiqC1IuXZ1u9Q7snR0uvFaJVfhxQsOtkyMZSinPppFBlZG2Aip1SasflUKyvgO6exYRiHEsE1VYjFufgFOUe0zk00FFYHm126";

const stripeTestPromise = loadStripe(PLUBLIC_KEY);

export default function StripeTest() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentTest />
    </Elements>
  );
}
