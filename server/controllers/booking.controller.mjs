// import connectionPool from "../utils/db.mjs";

// export async function bookSeat(req, res, next) {
//   const cinema = req.query.cinema;
//   const movie = req.query.movie;
//   const hall = req.query.hall;
//   const time = req.query.time;
//   const date = req.query.date;
//   try {
//     const results = await connectionPool.query(
//       `WITH ordered_seats AS (
//   SELECT DISTINCT ON (halls.hall_number, screentime.time, seat.number)
//     halls.hall_number,
//     screentime.time,
//     seat.number AS seat_no,
//     halls_seat.status
//   FROM
//     seat
//   LEFT JOIN halls_seat ON halls_seat.seat_id = seat.id
//   LEFT JOIN halls ON halls_seat.hall_id = halls.id
//   INNER JOIN halls_screentimes ON halls.id = halls_screentimes.hall_id
//   INNER JOIN screentime ON halls_screentimes.screen_time_id = screentime.id
//   ORDER BY halls.hall_number, screentime.time, seat.number
// )
// SELECT
//     cinemas.name,
//     movies.title,
//     movies.image AS movie_Image,
//     array_agg(DISTINCT genres.genres_name) AS movie_genres,
//     movies.theatrical_release,
//     halls.hall_number,
//     screentime.time,
//     (
//       SELECT json_agg(
//         json_build_object(
//           'seat_no', os.seat_no,
//           'status', os.status
//         )
//         ORDER BY os.seat_no
//       )
//       FROM ordered_seats os
//       WHERE os.hall_number = halls.hall_number AND os.time = screentime.time
//     ) AS seats
// FROM
//     cinemas
// INNER JOIN
//     movies_cinemas_halls ON movies_cinemas_halls.cinema_id = cinemas.id
// INNER JOIN
//     movies ON movies_cinemas_halls.movie_id = movies.id
// INNER JOIN
//     movies_genres ON movies.id = movies_genres.movie_id
// INNER JOIN
//     genres ON movies_genres.genre_id = genres.id
// INNER JOIN
//     halls ON movies_cinemas_halls.hall_id = halls.id
// INNER JOIN
//     halls_screentimes ON halls.id = halls_screentimes.hall_id
// INNER JOIN
//     screentime ON halls_screentimes.screen_time_id = screentime.id
// WHERE
//     cinemas.name LIKE $1 AND movies.title LIKE $2 AND halls.hall_number LIKE $3 AND screentime.time LIKE $4 AND $5 BETWEEN movies.theatrical_release AND movies.out_of_theaters
// GROUP BY
//     cinemas.name,
//     movies.title,
//     halls.hall_number,
//     movie_Image,
//     movies.theatrical_release,
//     screentime.time
// ORDER BY
//     halls.hall_number,
//     screentime.time;`,
//       [cinema, movie, hall, time, date]
//     );
//     return res.status(200).json({
//       message: "data fetch succesfully",
//       data: results.rows[0],
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server could not get data booking because database connection",
//     });
//   }
// }
import connectionPool from "../utils/db.mjs";

export async function bookSeat(req, res, next) {
  const { cinema, movie, hall, time, date } = req.query;

  // ตรวจสอบว่ามีการส่งค่าที่จำเป็นหรือไม่
  if (!cinema || !movie || !hall || !time || !date) {
    return res.status(400).json({
      message: "Missing required query parameters",
    });
  }

  try {
    const results = await connectionPool.query(
      `WITH ordered_seats AS (
        SELECT DISTINCT ON (halls.hall_number, screentime.time, seat.number)
          halls.hall_number,
          screentime.time,
          seat.number AS seat_no,
          halls_seat.status
        FROM 
          seat
        LEFT JOIN halls_seat ON halls_seat.seat_id = seat.id
        LEFT JOIN halls ON halls_seat.hall_id = halls.id
        INNER JOIN halls_screentimes ON halls.id = halls_screentimes.hall_id
        INNER JOIN screentime ON halls_screentimes.screen_time_id = screentime.id 
        ORDER BY halls.hall_number, screentime.time, seat.number
      )
      SELECT
          cinemas.name,
          movies.title,
          movies.image AS movie_image,
          array_agg(DISTINCT genres.genres_name) AS movie_genres,
          movies.theatrical_release,
          movies.out_of_theaters,
          halls.hall_number,
          screentime.time,
          (
            SELECT json_agg(
              json_build_object(
                'seat_no', os.seat_no,
                'status', os.status
              )
              ORDER BY os.seat_no
            )
            FROM ordered_seats os
            WHERE os.hall_number = halls.hall_number AND os.time = screentime.time
          ) AS seats
      FROM
          cinemas
      INNER JOIN
          movies_cinemas_halls ON movies_cinemas_halls.cinema_id = cinemas.id
      INNER JOIN
          movies ON movies_cinemas_halls.movie_id = movies.id
      INNER JOIN
          movies_genres ON movies.id = movies_genres.movie_id
      INNER JOIN
          genres ON movies_genres.genre_id = genres.id
      INNER JOIN
          halls ON movies_cinemas_halls.hall_id = halls.id
      INNER JOIN 
          halls_screentimes ON halls.id = halls_screentimes.hall_id
      INNER JOIN 
          screentime ON halls_screentimes.screen_time_id = screentime.id
      WHERE 
          cinemas.name LIKE $1 AND movies.title LIKE $2 AND halls.hall_number::TEXT LIKE $3 AND screentime.time::TEXT LIKE $4  AND $5  >= movies.theatrical_release 
    AND $5 < movies.out_of_theaters
      GROUP BY
          cinemas.name,
          movies.title,
          halls.hall_number,
          movie_image,
          movies.theatrical_release,
          screentime.time,
          movies.out_of_theaters
      ORDER BY
          halls.hall_number,
          screentime.time;`,
      [`%${cinema}%`, `%${movie}%`, `%${hall}%`, `%${time}%`, date]
    );

    if (results.rows.length === 0) {
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
