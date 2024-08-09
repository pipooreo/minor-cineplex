// // cityController.js
// import { Router } from "express";
// import connectionPool from "../utils/db.mjs";

// // CITY
// export async function getCityAll(req, res, next) {
//   try {
//     const results = await connectionPool.query(
//       `
//        SELECT
//       city.id,
//       city.city_name,
      
//       json_agg(
//       json_build_object(
//       'cinema_id', cinemas.id,
//       'name', cinemas.name,
//       'address', cinemas.address
//       )) AS cinema
//        FROM
//        cinemas
//        INNER JOIN
//         city_cinemas ON cinemas.id = city_cinemas.cinema_id
//         INNER JOIN
//         city ON city_cinemas.city_id = city.id GROUP BY city.id, city.city_name`
//     );
//     return res.status(200).json({
//       message: "data fetch succesfully",
//       data: results.rows,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server could not get city because database connection",
//       message: "Server could not get city because database connection",
//     });
//   }
// }

// export async function getCinemasByCity(req, res, next) {
//   try {
//     const citySearch = req.query.citySearch;
//     const results = await connectionPool.query(
//       `
//       select
//         city.id as city_id,
//         city.city_name,
//         json_agg(json_build_object('name',
//         cinemas.name,'address', cinemas.address
//         )
//       ) as cinemas
//       FROM city
//       INNER JOIN city_cinemas ON city_cinemas.city_id = city.id
//       INNER JOIN cinemas ON cinemas.id = city_cinemas.cinema_id
//       where city.city_name ilike $1
//       GROUP BY city.id, city.city_name;
//     `,
//       [`%${citySearch}%`]
//     );
//     if (results.rowCount == 0) {
//       return res.status(404).json({
//         message: "City not found",
//       });
//     }
//     return res.status(200).json({
//       message: "data fetch succesfully",
//       data: results.rows,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server could not get cinemas because database connection",
//     });
//   }
// }

// // CINEMAS
// export async function getCinemasAll(req, res, next) {
//   try {
//     const results = await connectionPool.query(
//       `
//       select
//       cinemas.id,
//         city.city_name,
//         cinemas.name,
//         cinemas.address
//       from cinemas
//       inner join
//         city_cinemas on cinemas.id = city_cinemas.cinema_id
//       inner join
//         city on city_cinemas.city_id = city.id`
//     );
//     res.status(200).json({ data: results.rows });
//   } catch (error) {
//     return res.status(500).json({
//       message:
//         "Server could not get the filtered cinemas because database connection",
//     });
//   }
// }

// export async function getCinemasById(req, res) {
//   try {
//     const cinemaId = req.query.cinemaId;
//     const results = await connectionPool.query(
//       `select * from cinemas where id = $1`,
//       [cinemaId]
//     );
//     if (results.rowCount == 0) {
//       return res.status(404).json({
//         message: "Cinema not found",
//       });
//     }
//     return res.status(200).json({
//       data: results.rows[0],
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server could not find the cinemas because database connection",
//     });
//   }
// }

// //MOVIES

// export async function getMoviesReleased(req, res, next) {
//   let results;
//   try {
//     results = await connectionPool.query(`
// SELECT 
//     movies.id, 
//     movies.title, 
//     movies.image, 
//     movies.theatrical_release::date AS theatrical_release,
//     movies.out_of_theaters::date AS out_of_theaters,
//     movies.rating, 
//     (
//         SELECT array_agg(DISTINCT genres.genres_name)
//         FROM movies_genres
//         INNER JOIN genres ON genres.id = movies_genres.genre_id
//         WHERE movies_genres.movie_id = movies.id
//     ) AS genres,
//     movies.language,
//   ROUND(AVG(comments.rating)::numeric, 1) AS average_rating FROM 
//     movies
// INNER JOIN 
//     comments ON movies.id = comments.movie_id
// WHERE 
//     CURRENT_TIMESTAMP BETWEEN 
//         movies.theatrical_release::date AND 
//         movies.out_of_theaters::date
// GROUP BY
//     movies.id, 
//     movies.title, 
//     movies.image, 
//     movies.theatrical_release,
//     movies.out_of_theaters, 
//     movies.rating,
//     movies.language
// ORDER BY 
//     movies.id
//       `);
//     res.status(200).json({ data: results.rows });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server could not get  the movies because database connection",
//     });
//   }
// }
// export async function getMoviesComingSoon(req, res, next) {
//   let results;
//   try {
//     results = await connectionPool.query(`
//       SELECT 
//           movies.id, 
//           movies.title, 
//           movies.image, 
//           movies.theatrical_release::date AS theatrical_release,
//           movies.out_of_theaters::date AS out_of_theaters,
//           movies.rating, 
//           array_agg(genres.genres_name) AS genres,
//           movies.language
//       FROM 
//           movies
//       INNER JOIN
//           movies_genres ON movies.id = movies_genres.movie_id
//       INNER JOIN
//           genres ON genres.id = movies_genres.genre_id
//       WHERE 
//           CURRENT_TIMESTAMP < movies.theatrical_release::date
//       GROUP BY
//           movies.id, 
//           movies.title, 
//           movies.image, 
//           movies.theatrical_release,
//           movies.out_of_theaters, 
//           movies.rating,
//           movies.language
//       ORDER BY 
//           movies.id;

//       `);
//     res.status(200).json({ data: results.rows });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server could not get  the movies because database connection",
//     });
//   }
// }

// export async function getMoviesById(req, res, next) {
//   try {
//     const { movieSearch } = req.query;
//     // console.log("Search term:", movieSearch);
//     const normalizedSearchTerm = movieSearch.replace(/-/g, " ");
//     const results = await connectionPool.query(
//       `
//       SELECT 
//         movies.id,
//         movies.title,
//         movies.image,
//         movies.description,
//         movies.theatrical_release,
//         movies.out_of_theaters,
//         movies.rating,
//         ARRAY_AGG(genres.genres_name) AS genres,
//         movies.language
//       FROM
//         movies
//       inner JOIN
//         movies_genres ON movies.id = movies_genres.movie_id
//       inner JOIN
//         genres ON movies_genres.genre_id = genres.id
//       WHERE
//         movies.title ILIKE $1
//       GROUP BY
//         movies.id,
//         movies.title,
//         movies.image,
//         movies.description,
//         movies.theatrical_release,
//         movies.out_of_theaters,
//         movies.rating,
//         movies.language
//       `,
//       [`%${normalizedSearchTerm}%`]
//     );
//     // console.log("results:", normalizedSearchTerm);

//     if (results.rows.length === 0) {
//       return res.status(404).json({
//         message: "Movie not found",
//       });
//     }

//     return res.status(200).json({
//       data: results.rows,
//     });
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// }

// export async function getMoviesByGenres(req, res) {
//   let results;
//   try {
//     const moviesGenres = req.query.moviesGenres;
//     results = await connectionPool.query(
//       `
//       SELECT movies.title
//       FROM movies
//       INNER JOIN movies_genres ON movies.id = movies_genres.movie_id
//       INNER JOIN genres ON movies_genres.genre_id = genres.id
//       WHERE genres.genres_name = $1
//       `,
//       [moviesGenres]
//     );

//     if (results.rowCount === 0) {
//       console.log("No movies found for genre:", moviesGenres);
//       return res.status(404).json({
//         message: "movies not found",
//       });
//     } else {
//       // console.log("Movies found:", results.rows);
//       return res.status(200).json({
//         data: results.rows,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching movies by genre:", error);
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// }

// //Comment
