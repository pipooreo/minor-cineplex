// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
// } from "@stripe/react-stripe-js";
// import axios from "axios";

// import CheckoutForm from "../componants/CheckoutPaymentTest";

// const stripePromise = loadStripe(
//   "pk_test_51PfOyVRsVxHSwh1BgieeOpwtzfJs13MS3FEuMB0GXJDk5oL5r4PcCpZujoeGJZZXLocBTcEwI0qOLbdxoEccbkGj00oYNrgx2N"
// );

// export default function TestPaymentPage() {
//   const [clientSecret, setClientSecret] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("http://localhost:4000/payment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ticket: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="App">
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// }
