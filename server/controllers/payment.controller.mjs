import Stripe from "stripe";
import connectionPool from "../utils/db.mjs";

const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

export async function createPayment(req, res) {
  const { amount, paymentMethodId, name, email } = req.body;
  // console.log("bodyname: ", req.body);
  // console.log("Received payment_method.id: ", paymentMethodId);

  try {
    const userResult = await connectionPool.query(
      `SELECT id, name AS username, email FROM users WHERE email = $1 AND name = $2`,
      [email, name]
    );
    // console.log("Result: ", userResult);

    if (userResult.rowCount === 0) {
      // ถ้าไม่พบผู้ใช้ในฐานข้อมูล
      return res.status(404).json({ message: "User not found." });
    }

    // กำหนดผู้ใช้ด้วย stripe customer
    const customers = await stripe.customers.list({
      email: email, // กำหนดอีเมลสำหรับค้นหา
      limit: 1, // จำกัดการค้นหาหนึ่งรายการ (ถ้ามีลูกค้าหลายคนที่ใช้เมลเดียวกัน)
    });

    let customer;

    if (customers.data.length > 0) {
      // ถ้าพบลูกค้า
      customer = customers.data[0];
      console.log("customerData", customer);
      // res.json(customers.data[0]); // ส่งข้อมูลลูกค้าคนแรกที่พบ
    } else {
      // ถ้าไม่พบลูกค้า
      customer = await stripe.customers.create({
        name,
        email,
      });
      // console.log("customerData: ", customer);
    }

    const paymentIntents_create = await stripe.paymentIntents.create({
      amount, // จำนวนเงินในหน่วยสตางค์
      currency: "thb",
      payment_method_types: ["card"],
      payment_method: paymentMethodId,
      customer: customer.id,
      confirm: true,
    });
    // console.log("payment", paymentIntents_create);

    res.send({
      success: true,
      clientSecret: paymentIntents_create.client_secret,
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get  the movies because database connection",
    });
  }
}

export async function getPayment(req, res) {
  let results;
  const { movie, hall, time, cinema, select_date, users_id } = req.query;
  // console.log(req.query);
  try {
    results = await connectionPool.query(
      `SELECT 
          title, 
          select_date :: text, 
          movies.image, 
          hall_number, 
          time, 
          cinemas.name AS cinema_name, 
          array_agg(DISTINCT seat_num) AS seat_number,
          array_agg(DISTINCT genres.genres_name) AS genres,
          movies.language AS language,
          users.name AS username,
          users.email AS email,
          status,
          min(DISTINCT to_char(booking.created_at AT TIME ZONE 'Asia/Bangkok', 'HH24:MI:SS')) AS booking_time
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
      INNER JOIN
          movies_genres ON movies_genres.movie_id = movies.id
      INNER JOIN
          genres ON movies_genres.genre_id = genres.id
      WHERE 
          title = $1 AND 
          hall_number = $2 AND 
          time = $3 AND 
          cinemas.name = $4 AND 
          select_date = $5 AND 
          users.id = $6 AND
          status = 'reserved'
      GROUP BY
          title, 
          select_date, 
          movies.image, 
          hall_number, 
          time, 
          cinemas.name, 
          users.name,
          users.email,
          movies.language,
          status`,
      [movie, hall, time, cinema, select_date, users_id]
    );
    // console.log(results);
    if (results.rowCount === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    return res.status(200).json({
      data: results.rows,
      message: "Payment successfully",
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      message: "Server could not create payment due to database error",
    });
  }
}

export async function updatePayment(req, res, next) {
  const { user, cinema, movie, select_date, time, hall, seats, coupon } =
    req.body;
  // console.log(req.body);
  let result;
  try {
    for (let seat of seats) {
      if (coupon) {
        result = await connectionPool.query(
          `UPDATE booking
       SET status = 'booked',
        payment_method = 'credit card', 
        payment_status = 'success', 
        updated_at = CURRENT_TIMESTAMP,
        coupon_id = (
        select id from coupons where coupon_code = $8)
       WHERE user_id = $1
         AND cinema_id = (SELECT id FROM cinemas WHERE name = $2)
         AND movie_id = (SELECT id FROM movies WHERE title = $3)
         AND select_date = $4::date
         AND time_id = (SELECT id FROM screentime WHERE time = $5)
         AND hall_id = (SELECT id FROM halls WHERE hall_number = $6)
          AND seat_id = (SELECT id FROM seat_number WHERE seat_num = $7)`,
          [user, cinema, movie, select_date, time, hall, seat, coupon]
        );
      } else {
        result = await connectionPool.query(
          `UPDATE booking
         SET status = 'booked',
          payment_method = 'credit card', 
          payment_status = 'success', 
          updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $1
           AND cinema_id = (SELECT id FROM cinemas WHERE name = $2)
           AND movie_id = (SELECT id FROM movies WHERE title = $3)
           AND select_date = $4::date
           AND time_id = (SELECT id FROM screentime WHERE time = $5)
           AND hall_id = (SELECT id FROM halls WHERE hall_number = $6)
            AND seat_id = (SELECT id FROM seat_number WHERE seat_num = $7)`,
          [user, cinema, movie, select_date, time, hall, seat]
        );
      }
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Booking not found or no changes made",
      });
    }

    return res.status(200).json({
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({
      message: "Server error while updating booking",
    });
  }
}

export async function deletePayment(req, res, next) {
  const { user, cinema, movie, select_date, time, hall, seats } = req.body;
  console.log("DataRequest: ", req.body);

  let result;
  try {
    for (let seat of seats) {
      result = await connectionPool.query(
        `DELETE FROM booking
       WHERE user_id = $1
         AND cinema_id = (SELECT id FROM cinemas WHERE name = $2)
         AND movie_id = (SELECT id FROM movies WHERE title = $3)
         AND select_date = $4::date
         AND time_id = (SELECT id FROM screentime WHERE time = $5)
         AND hall_id = (SELECT id FROM halls WHERE hall_number = $6)
         AND seat_id = (SELECT id FROM seat_number WHERE seat_num = $7)`,
        [user, cinema, movie, select_date, time, hall, seat]
      );
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Booking not found or no changes made",
      });
    }

    return res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({
      message: "Server error while deleting booking",
    });
  }
}
