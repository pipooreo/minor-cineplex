import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_TEST);

// Function to handle payment processing
export const processPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethodId, email } = req.body;

    // Validate inputs
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required.",
      });
    }

    // Create a payment intent with Stripe
    console.log("888 paymentMethodId", paymentMethodId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "thb",
      payment_method_types: ["promptpay"],
      receipt_email: email,
    });

    console.log("Payment processed with the following details:", paymentIntent);
    res.json({
      success: true,
      message: "Payment processed successfully!",
      paymentIntent,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process payment.",
      error: error.message,
    });
  }
};
// export const processPayment = async (req, res) => {
//   try {
//     const { amount, currency, paymentMethodId, email } = req.body;

//     // Validate inputs
//     if (!amount) {
//       return res.status(400).json({
//         success: false,
//         message: "Amount is required.",
//       });
//     }

//     // Create a payment intent with Stripe
//     console.log("888 paymentMethodId", paymentMethodId);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency: "thb",
//       payment_method_types: ["promptpay"],
//       receipt_email: email,
//     });

//     console.log("Payment processed with the following details:", paymentIntent);
//     res.json({
//       success: true,
//       message: "Payment processed successfully!",
//       paymentIntent,
//     });
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to process payment.",
//       error: error.message,
//     });
//   }
// };

// const paymentLink = await stripe.paymentLinks.create({
//     amount: amount * 100,
//     currency: "thb",
//     payment_method_types: ["promptpay"],
//     receipt_email: email,

//   after_completion: {
//     type: "redirect",
//     redirect: {
//       url: "https://your-success-page.com",
//     },
//   },
// });

// res.json({ url: paymentLink.url });

// Function to handle updating payment data
export const updatePaymentData = async (req, res) => {
  const { user, cinema, movie, select_date, time, hall, seats, coupon } =
    req.body;

  console.log("Updating payment data with the following details:", {
    user,
    cinema,
    movie,
    select_date,
    time,
    hall,
    seats,
    coupon,
  });

  try {
    const { createClient } = require("@supabase/supabase-js");
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("payments")
      .insert([
        { user, cinema, movie, select_date, time, hall, seats, coupon },
      ]);

    if (error) {
      throw error;
    }

    res.json({ success: true, message: "Payment data updated successfully!" });
  } catch (error) {
    console.error("Error updating payment data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment data.",
      error: error.message,
    });
  }
};
