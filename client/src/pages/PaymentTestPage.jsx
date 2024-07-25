import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentTest() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    // console.log(paymentMethod);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Success Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Erorr", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="bg-gray-300 p-10 h-[500px] w-[100%] mt-[80px]">
            <div className="bg-gray-400">
              <CardElement options={CARD_OPTIONS} />
            </div>
            <button className="border-[1px]">Pay</button>
          </fieldset>
        </form>
      ) : (
        <div>
          <h2>Good</h2>
        </div>
      )}
    </>
  );
}
