import Stripe from "stripe";
import connectionPool from "../utils/db.mjs";

const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

export async function createPayment(req, res) {
  const { amount, id } = req.body;

  {
    const paymentIntents_data = await stripe.paymentIntents.create({
      amount, // จำนวนเงินในหน่วยสตางค์
      currency: "thb",
      payment_method_types: ["card"],
      payment_method: id,
      confirm: true,
    });
    console.log(paymentIntents_data);

    res.send({
      success: true,
      clientSecret: paymentIntents_data.client_secret,
    });
  }
}

export async function getPayment(req, res) {
  let results;
  const { movie, hall_number, time, cinema_name, select_date, users_id } =
    req.query;
  // console.log(req.query);
  try {
    results = await connectionPool.query(
      `SELECT 
          title, 
          select_date, 
          movies.image, 
          hall_number, 
          time, 
          cinemas.name AS cinema_name, 
          array_agg(DISTINCT seat_num) AS seat_number, 
          users.name AS username 
      FROM 
          booking
      INNER JOIN 
          movies ON movies.id = booking.movie_id
      INNER JOIN
          halls ON halls.id = booking.hall_id
      INNER JOIN 
          screentime ON screentime.id = booking.time_id
      INNER JOIN 
          cinemas ON cinemas.id = booking.cinema_id
      INNER JOIN 
          seat_number ON seat_number.id = booking.seat_id
      INNER JOIN 
          users ON users.id = booking.user_id
      WHERE 
          title = $1 AND 
          hall_number = $2 AND 
          time = $3 AND 
          cinemas.name = $4 AND 
          select_date = $5 AND 
          users.id = $6
      GROUP BY
          title, 
          select_date, 
          movies.image, 
          hall_number, 
          time, 
          cinemas.name, 
          users.name`,
      [movie, hall_number, time, cinema_name, select_date, users_id]
    );
    // console.log(results);
    if (results.rowCount === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    return res.status(200).json({
      message: "Payment successfully",
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      message: "Server could not create payment due to database error",
    });
  }
}
