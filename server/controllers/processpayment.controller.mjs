import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

// Function to handle payment processing
export const processPayment = async (req, res) => {
  // console.log(req.body);
  try {
    const { amount, email } = req.body;

    // Validate inputs
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required.",
      });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "thb",
      payment_method_types: ["promptpay"],
      receipt_email: email,
    });

    // console.log("Payment processed with the following details:", paymentIntent);
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
