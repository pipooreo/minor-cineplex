import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

export async function getPayment(req, res) {
  {
    // const { user, product } = req.body;
    const paymentIntents_data = await stripe.paymentIntents.create({
      amount: 2000, // จำนวนเงินในหน่วยสตางค์
      currency: "thb",
      payment_method_types: ["card"],
    });
    console.log(paymentIntents_data);

    res.send({
      clientSecret: paymentIntents_data.client_secret,
    });
  }
}
