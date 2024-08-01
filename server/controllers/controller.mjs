// cityController.js
import { Router } from "express";
import connectionPool from "../utils/db.mjs";

// CITY
export async function getCityAll(req, res, next) {
  try {
    const results = await connectionPool.query(
      `
       SELECT
      city.id,
      city.city_name,
      
      json_agg(
      json_build_object(
      'cinema_id', cinemas.id,
      'name', cinemas.name,
      'address', cinemas.address
      )) AS cinema
       FROM
       cinemas
       INNER JOIN
        city_cinemas ON cinemas.id = city_cinemas.cinema_id
        INNER JOIN
        city ON city_cinemas.city_id = city.id GROUP BY city.id, city.city_name`
    );
    return res.status(200).json({
      message: "data fetch succesfully",
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get city because database connection",
      message: "Server could not get city because database connection",
    });
  }
}

export async function getCinemasByCity(req, res, next) {
  try {
    const citySearch = req.query.citySearch;
    const results = await connectionPool.query(
      `
      select
        city.id as city_id,
        city.city_name,
        json_agg(json_build_object('name',
        cinemas.name,'address', cinemas.address
        )
      ) as cinemas
      FROM city
      INNER JOIN city_cinemas ON city_cinemas.city_id = city.id
      INNER JOIN cinemas ON cinemas.id = city_cinemas.cinema_id
      where city.city_name ilike $1
      GROUP BY city.id, city.city_name;
    `,
      [`%${citySearch}%`]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "City not found",
      });
    }
    return res.status(200).json({
      message: "data fetch succesfully",
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get cinemas because database connection",
    });
  }
}

// CINEMAS
export async function getCinemasAll(req, res, next) {
  try {
    const results = await connectionPool.query(
      `
      select
      cinemas.id,
        city.city_name,
        cinemas.name,
        cinemas.address
      from cinemas
      inner join
        city_cinemas on cinemas.id = city_cinemas.cinema_id
      inner join
        city on city_cinemas.city_id = city.id`
    );
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not get the filtered cinemas because database connection",
    });
  }
}

export async function getCinemasById(req, res) {
  try {
    const cinemaId = req.query.cinemaId;
    const results = await connectionPool.query(
      `select * from cinemas where id = $1`,
      [cinemaId]
    );
    console.log("result: ", results);
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Cinema not found",
      });
    }
    return res.status(200).json({
      data: results.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not find the cinemas because database connection",
    });
  }
}

//MOVIES

export async function getMoviesAll(req, res, next) {
  let results;
  try {
    results = await connectionPool.query(`
        select 
          movies.id, 
          movies.title, 
          movies.image, 
          movies.theatrical_release,
          movies.out_of_theaters,
          movies.rating, 
          array_agg(genres.genres_name) as genres,
          movies.language
        from 
          movies
        inner join
          movies_genres ON movies.id = movies_genres.movie_id
        inner join
          genres ON genres.id = movies_genres.genre_id
        group by
          movies.id, 
          movies.title, 
          movies.image, 
          movies.theatrical_release,
          movies.out_of_theaters, 
          movies.rating,
          movies.language
        order by movies.id
      `);
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get  the movies because database connection",
    });
  }
}

export async function getMoviesById(req, res, next) {
  try {
    const { movieSearch } = req.query;
    // console.log("Search term:", movieSearch);
    const normalizedSearchTerm = movieSearch.replace(/-/g, " ");
    const results = await connectionPool.query(
      `
      SELECT 
        movies.id,
        movies.title,
        movies.image,
        movies.description,
        movies.theatrical_release,
        movies.out_of_theaters,
        movies.rating,
        ARRAY_AGG(genres.genres_name) AS genres,
        movies.language
      FROM
        movies
      inner JOIN
        movies_genres ON movies.id = movies_genres.movie_id
      inner JOIN
        genres ON movies_genres.genre_id = genres.id
      WHERE
        movies.title ILIKE $1
      GROUP BY
        movies.id,
        movies.title,
        movies.image,
        movies.description,
        movies.theatrical_release,
        movies.out_of_theaters,
        movies.rating,
        movies.language
      `,
      [`%${normalizedSearchTerm}%`]
    );
    // console.log("results:", normalizedSearchTerm);

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getMoviesByGenres(req, res) {
  let results;
  try {
    const moviesGenres = req.query.moviesGenres;
    results = await connectionPool.query(
      `
      SELECT movies.title
      FROM movies
      INNER JOIN movies_genres ON movies.id = movies_genres.movie_id
      INNER JOIN genres ON movies_genres.genre_id = genres.id
      WHERE genres.genres_name = $1
      `,
      [moviesGenres]
    );

    if (results.rowCount === 0) {
      console.log("No movies found for genre:", moviesGenres);
      return res.status(404).json({
        message: "movies not found",
      });
    } else {
      console.log("Movies found:", results.rows);
      return res.status(200).json({
        data: results.rows,
      });
    }
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

//Comment
export async function getCommentsAll(req, res, next) {
  try {
    const results = await connectionPool.query(
      `
      select
        users.name,
        comments.comment,
        comments.rating
      from
        comments
      inner join users on comments.user_id = users.id`
    );
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get the comments because database connection",
    });
  }
}

export async function getCommentsById(req, res, next) {
  try {
    const commentId = req.query.commentId;
    const results = await connectionPool.query(
      `select * from comments where id = $1`,
      [commentId]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    return res.status(200).json({
      data: results.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get the comments because database connection",
    });
  }
}

export async function getCommentsByMoviesName(req, res, next) {
  try {
    const movieName = req.query.movieName;
    const results = await connectionPool.query(
      `
      select
        comments.id as comment_id,
        movies.title as moviesname,
        users.name as name,
        users.image as image,
        to_char(to_date(comments.created_at, 'YYYY-MM-DD'), 'DD Mon YYYY') as post_date,
        comments.comment,
        comments.rating
      from
        comments
      inner join movies on movies.id = comments.movie_id
      inner join users on users.id = comments.user_id
      where movies.title ilike $1
      `,
      [`%${movieName}%`]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "There are no movie to display a comment",
      });
    }
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get the comment because database connection",
    });
  }
}

export async function getCommentByUser(req, res) {
  // console.log(req.params);
  const { userId } = req.params;
  try {
    const result = await connectionPool.query(
      `select * from comments where user_id = $1`,
      [userId]
    );
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not create the comment because database connection",
    });
  }
}

export async function createComment(req, res) {
  // console.log(req.body);
  const { user_id, movie_id, date, comment, rating } = req.body;
  try {
    await connectionPool.query(
      `insert into comments (user_id, movie_id, created_at, comment, rating) values ($1,$2,$3,$4,$5)`,
      [user_id, movie_id, date, comment, rating]
    );
    return res
      .status(201)
      .json({ message: "User created comment successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not create the comment because database connection",
    });
  }
}

export async function updateComment(req, res) {
  // console.log(req.body);
  const { user_id, movie_id, date, comment, rating } = req.body;
  try {
    await connectionPool.query(
      `update comments set created_at = $1, comment = $2, rating = $3 where user_id = $4 and movie_id = $5`,
      [date, comment, rating, user_id, movie_id]
    );
    return res
      .status(200)
      .json({ message: "User Updated comment successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not create the comment because database connection",
    });
  }
}

export async function getMoviesBySearchBar(req, res, next) {
  try {
    const noResults = [];
    const {
      movieName,
      moviesGenres,
      moviesLanguage,
      moviesCity,
      releasedDate,
      tags = [],
    } = req.query;

    let params = [];
    let query = `
      WITH subquery AS (
        SELECT
            halls.hall_number,
            jsonb_agg(DISTINCT screentime.time ORDER BY screentime.time) AS start_times
        FROM
            halls
        INNER JOIN
            halls_screentimes ON halls.id = halls_screentimes.hall_id
        INNER JOIN
            screentime ON halls_screentimes.screen_time_id = screentime.id
        GROUP BY
            halls.hall_number
      )
      SELECT
          cinemas.name AS cinema_name,
          movies.title AS movie_name,
          city.city_name AS city_name,
          array_agg(DISTINCT genres.genres_name) AS movie_genres,
          movies.language AS movie_language,
          movies.image AS movie_image,
          array_agg(DISTINCT tags.tag_name) AS cinema_tags,
          movies.theatrical_release,
          movies.out_of_theaters,
          jsonb_object_agg(subquery.hall_number, subquery.start_times) AS schedule
      FROM
          movies
      INNER JOIN
          movies_cinemas ON movies.id = movies_cinemas.movies_id
      INNER JOIN
          cinemas ON movies_cinemas.cinemas_id = cinemas.id
      LEFT JOIN 
          cinemas_tags ON cinemas.id = cinemas_tags.cinema_id
      LEFT JOIN
          tags ON cinemas_tags.tag_id = tags.id
      INNER JOIN
          movies_cinemas_halls ON movies.id = movies_cinemas_halls.movie_id AND cinemas.id = movies_cinemas_halls.cinema_id
      INNER JOIN
          halls ON movies_cinemas_halls.hall_id = halls.id
      INNER JOIN
          subquery ON halls.hall_number = subquery.hall_number
      INNER JOIN
          movies_genres ON movies.id = movies_genres.movie_id
      INNER JOIN
          city_cinemas ON cinemas.id = city_cinemas.cinema_id
      INNER JOIN
          city ON city_cinemas.city_id = city.id
      INNER JOIN
          genres ON movies_genres.genre_id = genres.id
      WHERE 1=1`;

    if (movieName) {
      query += ` AND LOWER(movies.title) LIKE LOWER($${params.length + 1})`;
      params.push(`%${movieName}%`);
    }
    if (moviesGenres) {
      query += ` AND movies.id IN (
                  SELECT movies_genres.movie_id
                  FROM movies_genres
                  INNER JOIN genres ON movies_genres.genre_id = genres.id
                  WHERE genres.genres_name ILIKE $${params.length + 1}
                )`;
      params.push(`%${moviesGenres}%`);
    }
    if (moviesLanguage) {
      query += ` AND movies.language = $${params.length + 1}`;
      params.push(moviesLanguage); // Use exact value from query parameter
    }
    if (moviesCity) {
      query += ` AND LOWER(city.city_name) LIKE LOWER($${params.length + 1})`;
      params.push(`%${moviesCity}%`);
    }
    if (releasedDate) {
      query += ` AND TO_DATE($${
        params.length + 1
      }, 'YYYY-MM-DD') BETWEEN TO_DATE(movies.theatrical_release, 'YYYY-MM-DD') AND TO_DATE(movies.out_of_theaters, 'YYYY-MM-DD')`;
      params.push(releasedDate);
    }

    if (tags.length > 0) {
      query += ` AND (
        SELECT COUNT(DISTINCT tag_name)
        FROM cinemas_tags
        INNER JOIN tags ON cinemas_tags.tag_id = tags.id
        WHERE tags.tag_name ILIKE ANY($${params.length + 1})
        AND cinemas_tags.cinema_id = cinemas.id
      ) = ${tags.length}`;
      params.push(tags);
    }

    query += `
      GROUP BY 
        cinemas.name,
        movies.title,
        city.city_name,
        movies.language,
        movies.image,
        movies.theatrical_release,
        movies.out_of_theaters
      ORDER BY 
        cinemas.name;`;

    const { rows } = await connectionPool.query(query, params);

    if (rows.length === 0) {
      return res.status(200).json({
        data: noResults,
      });
    }

    let moviesData = {};
    rows.forEach((row) => {
      const {
        city_name,
        cinema_name,
        cinema_tags,
        movie_genres,
        ...movieDetails
      } = row;

      const cinemaInfo = {
        cinema_name,
        movie_details: {
          ...movieDetails,
          cinema_tags: Array.isArray(cinema_tags)
            ? cinema_tags.map((tag) => tag.trim())
            : [],
          movie_genres: Array.isArray(movie_genres)
            ? movie_genres.map((genre) => genre.trim())
            : [],
        },
      };

      if (!moviesData[city_name]) {
        moviesData[city_name] = [];
      }
      moviesData[city_name].push(cinemaInfo);
    });

    const formattedResult = Object.keys(moviesData).map((city) => ({
      city_name: city,
      cinemas: moviesData[city],
    }));

    return res.status(200).json({
      data: formattedResult,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({
      message: "Server could not retrieve movies due to an internal error",
    });
  }
}

export async function getDaysAll(req, res, next) {
  try {
    const results = await connectionPool.query(
      `
       SELECT
      days.day_name from days
      `
    );
    return res.status(200).json({
      message: "data fetch succesfully",
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get days because database connection",
    });
  }
}

export async function getInfoForBookTicket(req, res, next) {
  try {
    const noResults = [];
    const {
      movieName,
      moviesGenres,
      moviesLanguage,
      moviesCity,
      releasedDate,
      cinemaId,
      cinemaName,
    } = req.query;
    let params = [];
    let query = `
      WITH subquery AS (
        SELECT
            halls.hall_number,
            jsonb_agg(DISTINCT screentime.time ORDER BY screentime.time) AS start_times
        FROM
            halls
        INNER JOIN
            halls_screentimes ON halls.id = halls_screentimes.hall_id
        INNER JOIN
            screentime ON halls_screentimes.screen_time_id = screentime.id
        GROUP BY
            halls.hall_number
      )
      SELECT
          cinemas.name AS cinema_name,
          cinemas.image AS cinema_image,
          movies.title AS movie_name,
          city.city_name AS city_name,
          array_agg(DISTINCT genres.genres_name) AS movie_genres,
          movies.language AS movie_language,
          movies.image AS movie_image,
          array_agg(DISTINCT tags.tag_name) AS cinema_tags,
          movies.theatrical_release,
          movies.out_of_theaters,
          cinemas.description,
          jsonb_object_agg(subquery.hall_number, subquery.start_times) AS schedule
      FROM
          movies
      INNER JOIN
          movies_cinemas ON movies.id = movies_cinemas.movies_id
      INNER JOIN
          cinemas ON movies_cinemas.cinemas_id = cinemas.id
      LEFT JOIN 
          cinemas_tags ON cinemas.id = cinemas_tags.cinema_id
      LEFT JOIN
          tags ON cinemas_tags.tag_id = tags.id
      INNER JOIN
          movies_cinemas_halls ON movies.id = movies_cinemas_halls.movie_id AND cinemas.id = movies_cinemas_halls.cinema_id
      INNER JOIN
          halls ON movies_cinemas_halls.hall_id = halls.id
      INNER JOIN
          subquery ON halls.hall_number = subquery.hall_number
      INNER JOIN
          movies_genres ON movies.id = movies_genres.movie_id
      INNER JOIN
          city_cinemas ON cinemas.id = city_cinemas.cinema_id
      INNER JOIN
          city ON city_cinemas.city_id = city.id
      INNER JOIN
          genres ON movies_genres.genre_id = genres.id
      WHERE 1=1`;

    if (movieName) {
      query += ` AND LOWER(movies.title) LIKE LOWER($${params.length + 1})`;
      params.push(`%${movieName}%`);
    }
    if (moviesGenres) {
      query += ` AND movies.id IN (
                  SELECT movies_genres.movie_id
                  FROM movies_genres
                  INNER JOIN genres ON movies_genres.genre_id = genres.id
                  WHERE genres.genres_name ILIKE $${params.length + 1}
                )`;
      params.push(`%${moviesGenres}%`);
    }
    if (moviesLanguage) {
      query += ` AND movies.language = $${params.length + 1}`;
      params.push(moviesLanguage); // Use exact value from query parameter
    }
    if (moviesCity) {
      query += ` AND LOWER(city.city_name) LIKE LOWER($${params.length + 1})`;
      params.push(`%${moviesCity}%`);
    }
    if (releasedDate) {
      query += ` AND TO_DATE($${params.length + 1}, 'YYYY-MM-DD') 
                 BETWEEN TO_DATE(movies.theatrical_release, 'YYYY-MM-DD') 
                 AND TO_DATE(movies.out_of_theaters, 'YYYY-MM-DD')`;
      params.push(releasedDate);
    }
    if (cinemaId) {
      query += ` AND cinemas.id = $${params.length + 1}`;
      params.push(cinemaId);
    }
    if (cinemaName) {
      query += ` AND LOWER(cinemas.name) LIKE LOWER($${params.length + 1})`;
      params.push(`%${cinemaName}%`);
    }

    query += `
      GROUP BY 
        cinemas.name,
        cinemas.image,
        movies.title,
        city.city_name,
        movies.language,
        movies.image,
        movies.theatrical_release,
        movies.out_of_theaters,
        cinemas.description
      ORDER BY 
        cinemas.name;`;

    const { rows } = await connectionPool.query(query, params);

    if (rows.length === 0) {
      return res.status(200).json({
        data: noResults,
      });
    }

    let moviesData = {};
    rows.forEach((row) => {
      const {
        city_name,
        cinema_name,
        cinema_image, // Make sure cinema_image is used here
        cinema_tags,
        description,
        movie_genres,
        ...movieDetails
      } = row;

      const cinemaInfo = {
        cinema_name,
        cinema_image,
        description,
        cinema_tags: Array.isArray(cinema_tags)
          ? cinema_tags.map((tag) => tag.trim())
          : [],
        movie_details: {
          ...movieDetails,
          cinema_tags: Array.isArray(cinema_tags)
            ? cinema_tags.map((tag) => tag.trim())
            : [],
          movie_genres: Array.isArray(movie_genres)
            ? movie_genres.map((genre) => genre.trim())
            : [],
        },
      };

      if (!moviesData[city_name]) {
        moviesData[city_name] = [];
      }
      moviesData[city_name].push(cinemaInfo);
    });

    const formattedResult = Object.keys(moviesData).map((city) => ({
      city_name: city,
      cinemas: moviesData[city],
    }));

    return res.status(200).json({
      data: formattedResult,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({
      message: "Server could not retrieve movies due to an internal error",
    });
  }
}
