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
      INNER JOIN city_cinemas ON city.id = city_cinemas.city_id
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
          COALESCE(array_agg(genres.genres_name), '{}') as genres,
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
    const movieSearch = req.query.movieSearch;
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

export async function getMoviesBySearchBar(req, res, next) {
  try {
    const { movieName, moviesGenres, moviesLanguage, moviesCity } = req.query;
    const releasedDate = "2024-10-02"; // Example hardcoded release date
    const current_date = new Date();
    console.log("test current_date", current_date);

    let params = [];
    let query = `
          SELECT 
              movies.id AS movie_id,
              movies.title AS movie_title,
              movies.image AS movie_image,
              movies.description AS movie_description,
              movies.theatrical_release AS theatrical_release,
              movies.out_of_theaters AS out_of_theaters,
              movies.rating AS movie_rating,
              ARRAY_AGG(DISTINCT genres.genres_name) AS genres,
              movies.language AS movie_language,
              city.city_name AS city_name,
              cinemas.name AS cinemas_name
          FROM
              movies
          INNER JOIN
              movies_genres ON movies.id = movies_genres.movie_id
          INNER JOIN
              genres ON movies_genres.genre_id = genres.id
          INNER JOIN
              movies_city ON movies.id = movies_city.movies_id
          INNER JOIN
              city ON city.id = movies_city.city_id
          INNER JOIN
              movies_cinemas ON movies.id = movies_cinemas.movies_id
          INNER JOIN
              cinemas ON movies_cinemas.cinemas_id = cinemas.id
          WHERE 1=1`;

    if (movieName) {
      query += ` AND movies.title ILIKE $${params.length + 1}`;
      params.push(`%${movieName}%`);
    }
    if (moviesGenres) {
      query += ` AND genres.genres_name ILIKE $${params.length + 1}`;
      params.push(`%${moviesGenres}%`);
    }
    if (moviesLanguage) {
      query += ` AND movies.language ILIKE $${params.length + 1}`;
      params.push(`%${moviesLanguage}%`);
    }
    if (moviesCity) {
      query += ` AND city.city_name ILIKE $${params.length + 1}`;
      params.push(`%${moviesCity}%`);
    }

    query += `
          AND TO_DATE($${
            params.length + 1
          }, 'YYYY-MM-DD') BETWEEN TO_DATE(movies.theatrical_release, 'YYYY-MM-DD') AND TO_DATE(movies.out_of_theaters, 'YYYY-MM-DD')
          GROUP BY movies.id, movies.title, movies.image, movies.description, movies.theatrical_release, movies.out_of_theaters, movies.rating, movies.language, city.city_name, cinemas.name
          ORDER BY city.city_name, cinemas.name, movies.id;`;

    params.push(releasedDate);

    const { rows } = await connectionPool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "There are no movies matching the search criteria",
      });
    }

    let moviesData = {};
    rows.forEach((row) => {
      const { city_name, cinemas_name, ...movieDetails } = row;
      const cinemaInfo = {
        cinemas_name,
        movie_details: {
          id: movieDetails.movie_id,
          title: movieDetails.movie_title,
          image: movieDetails.movie_image,
          description: movieDetails.movie_description,
          theatrical_release: movieDetails.theatrical_release,
          out_of_theaters: movieDetails.out_of_theaters,
          rating: movieDetails.movie_rating,
          genres: movieDetails.genres
            ? movieDetails.genres.map((genre) => genre.trim())
            : [],
          language: movieDetails.movie_language,
          city_name,
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
