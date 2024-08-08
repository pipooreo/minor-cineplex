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
      amount: amount * 100, // Convert to the smallest currency unit
      currency: "thb",
      //   confirm: true,
      payment_method_types: ["promptpay"],
    //   payment_method: paymentMethodId,
      //   payment_method: paymentMethodId,
      receipt_email: email, // Optional: Send receipt to the user
      //   customer: user.id,
    });

    console.log("Payment processed with the following details:", paymentIntent);


    // Send a response back to the client
    res.json({
    //   qrCodeUrl,
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
