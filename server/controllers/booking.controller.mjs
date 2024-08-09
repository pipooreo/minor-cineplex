import connectionPool from "../utils/db.mjs";

export async function bookingReserved(req, res, next) {
  const { user, cinema, movie, select_date, time, hall, seats } = req.body;
  let result;
  // const updated_at = new Date();
  try {
    for (let seat of seats) {
      // Step 1: ตรวจสอบความขัดแย้ง
      const conflictCheckResult = await connectionPool.query(
        `SELECT COUNT(*) AS conflict_count
   FROM booking
   WHERE 
     select_date = $1
     AND time_id = (SELECT id FROM screentime WHERE time = $2)
     AND hall_id = (SELECT id FROM halls WHERE hall_number = $3)
     AND seat_id = (SELECT id FROM seat_number WHERE number = $4)
     AND movie_id = (SELECT id FROM movies WHERE title = $5)
     AND cinema_id = (SELECT id FROM cinemas WHERE name = $6)`,
        [select_date, time, hall, seat, movie, cinema]
      );
      // console.log("data1", conflictCheckResult);
      const conflictCount = conflictCheckResult.rows[0].conflict_count;
      // console.log("data2", conflictCount);
      if (conflictCount > 0) {
        return res.status(400).json({
          message:
            "Conflict found: Booking with the same select_date, time_id, hall_id, and seat_id already exists.",
        });
      }
    }
    for (let seat of seats) {
      // Step 2: แทรกข้อมูลใหม่
      result = await connectionPool.query(
        `INSERT INTO booking (user_id, cinema_id, movie_id, select_date, time_id, hall_id, seat_id, status, updated_at)
       VALUES (
         $1, 
         (SELECT id FROM cinemas WHERE name = $2), 
         (SELECT id FROM movies WHERE title = $3), 
         $4, 
         (SELECT id FROM screentime WHERE time = $5), 
         (SELECT id FROM halls WHERE hall_number = $6), 
         (SELECT id FROM seat_number WHERE number = $7), 
         'reserved', 
         CURRENT_TIMESTAMP
       ) RETURNING *`,
        [user, cinema, movie, select_date, time, hall, seat]
      );
    }
    if (result.rowCount === 1) {
      return res.status(200).json({
        message: "Booking successfully created",
        booking: result.rows,
      });
    } else {
      return res.status(400).json({
        message: "Booking could not be created",
      });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({
      message: "Server could not create booking due to database error",
    });
  }
}

export async function dataSeat(req, res, next) {
  const { select_date, cinema, movie, hall, time } = req.query;
  // console.log(req.query);
  try {
    const results = await connectionPool.query(
      `WITH movie_info AS (
    SELECT 
        c.name AS cinema_name,
        m.title,
        m.image AS movie_Image,
        m.language,
        array_agg(DISTINCT g.genres_name) AS movie_genres,
        m.theatrical_release,
        m.out_of_theaters,
        h.hall_number,
        st.time AS screening_time,
        $1::text AS select_date 
    FROM 
        cinemas c
        INNER JOIN movies_cinemas_halls mch ON mch.cinema_id = c.id
        INNER JOIN movies m ON mch.movie_id = m.id
        INNER JOIN movies_genres mg ON m.id = mg.movie_id
        INNER JOIN genres g ON mg.genre_id = g.id
        INNER JOIN halls h ON mch.hall_id = h.id
        INNER JOIN halls_screentimes hs ON h.id = hs.hall_id
        INNER JOIN screentime st ON hs.screen_time_id = st.id
    WHERE 
        c.name LIKE $2
        AND m.title LIKE $3
        AND h.hall_number LIKE $4
        AND st.time LIKE $5
        AND CURRENT_TIMESTAMP >= m.theatrical_release::date
        AND CURRENT_TIMESTAMP < m.out_of_theaters::date
        AND $1::date >= m.theatrical_release::date
        AND $1::date < m.out_of_theaters::date
      GROUP BY
        c.name, m.title, m.image, m.language, m.theatrical_release, m.out_of_theaters,
        h.hall_number, st.time
),
seat_info AS (
    SELECT 
        sn.id,
        sn.number AS seat_number,
        sn.seat_num
    FROM seat_number sn
    WHERE sn.id BETWEEN 1 AND 50
)
SELECT 
    mi.cinema_name,
    mi.title,
    mi.movie_Image,
    mi.language,
    mi.movie_genres,
    mi.theatrical_release,
    mi.out_of_theaters,
    mi.hall_number,
    mi.screening_time,
    mi.select_date,
    json_agg(
        json_build_object(
            'seat', si.seat_number,
            'number', si.seat_num,
            'status', COALESCE(
                (SELECT b.status 
                 FROM booking b 
                 JOIN seat s ON b.seat_id = s.id
                 WHERE b.cinema_id = (SELECT id FROM cinemas WHERE name = mi.cinema_name)
                   AND b.movie_id = (SELECT id FROM movies WHERE title = mi.title)
                   AND b.hall_id = (SELECT id FROM halls WHERE hall_number = mi.hall_number)
                   AND b.time_id = (SELECT id FROM screentime WHERE time = mi.screening_time)
                   AND b.select_date = mi.select_date::date
                   AND s.number = si.seat_number
                ),
                'available'
            )
        )
        ORDER BY si.seat_number
    ) AS seat_status_array
FROM 
    movie_info mi
    CROSS JOIN seat_info si
GROUP BY
    mi.cinema_name, mi.title, mi.movie_Image, mi.language, mi.movie_genres,
    mi.theatrical_release, mi.out_of_theaters, mi.hall_number, mi.screening_time, mi.select_date`,
      [select_date, cinema, movie, hall, time]
    );

    if (results.rows.length === 0) {
      console.log(results);
      return res.status(404).json({
        message: "No data found for the given criteria",
      });
    }

    return res.status(200).json({
      message: "Data fetched successfully",
      data: results.rows[0],
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message:
        "Server could not get data booking because of database connection",
    });
  }
}

export async function updateBooking(req, res, next) {
  const { user, cinema, movie, select_date, time, hall, seats } = req.body;
  let result;
  try {
    for (let seat of seats) {
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

export async function deleteBooking(req, res, next) {
  const { user, cinema, movie, select_date, time, hall, seats } = req.body;
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

export async function BookingHistory(req, res) {
  const { userId } = req.params;
  // console.log(userId);
  let result;
  try {
    result = await connectionPool.query(
      `select select_date::text,cinemas.name as cinema_name, user_id, movie_id, movies.title as title, movies.image, halls.hall_number, 
      screentime.time, payment_status, payment_method,array_agg(seat_number.seat_num) as seats, users.name, coupons.type as coupon_type, 
      coupons.discount_value as discount, max(booking.created_at) as booking_date, max(booking.id) as booking_id, payment_id from booking
        inner join movies on movies.id = booking.movie_id
        inner join cinemas on cinemas.id = booking.cinema_id
        inner join halls on halls.id = booking.hall_id
        inner join seat_number on seat_number.id = booking.seat_id
        inner join screentime on screentime.id = booking.time_id
        inner join users on users.id = booking.user_id
        left join coupons on coupons.id = booking.coupon_id
        where users.id = $1
        group by select_date,cinemas.name, user_id, movie_id, movies.title, halls.hall_number, screentime.time, payment_status, users.name, 
        payment_method,movies.image, coupons.discount_value, coupons.type, payment_id
        order by select_date desc, screentime.time desc`,
      [userId]
      // [user, cinema, movie, select_date, time, hall, seat]
    );
    // console.log(result);
    // if (result.rowCount === 0) {
    //   return res.status(404).json({
    //     message: "Booking not found or no changes made",
    //   });
    // }

    return res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({
      message: "Server error while deleting booking",
    });
  }
}
