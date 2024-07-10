// cityController.js
import { Router } from "express";
import connectionPool from "../utils/db.mjs";

// CITY
export async function getCityAll(req, res, next) {
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
      message: "Server could not read assignment because database connection",
    });
  }
}

export async function getCinemasByCity(req, res, next) {
  try {
    const citySearch = req.params.citySearch;
    const results = await connectionPool.query(
      `
      select
        cinemas.name,
        cinemas.address
      from cinemas
      inner join
        city_cinemas on cinemas.id = city_cinemas.cinema_id
      inner join
        city on city_cinemas.city_id = city.id
      where 
      city.city_name = $1
    `,
      [citySearch]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "City not found",
      });
    }
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database connection",
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
      message: "Server could not read assignment because database connection",
    });
  }
}

export async function getCinemasById(req, res, next) {
  try {
    const cinemaId = req.params.cinemaId;
    const results = await connectionPool.query(
      `select * from cinemas where id = $1`,
      [cinemaId]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Cinema notd found",
      });
    }
    return res.status(200).json({
      data: results.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database connection",
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
          movies.name, 
          movies.image, 
          movies.released_at, 
          movies.rating, 
          array_agg(genres.genres_name) as genres,
          movies.language
        from 
          movies_genres
        inner join
          movies ON movies.id = movies_genres.movie_id
        inner join
          genres ON genres.id = movies_genres.genre_id
        group by
          movies.id, 
          movies.name, 
          movies.image, 
          movies.released_at, 
          movies.rating,
          movies.language
      `);
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
}

export async function getMoviesById(req, res, next) {
  try {
    const movieSearch = req.params.movieSearch;
    const results = await connectionPool.query(
      `
      select 
        movies.id,
        movies.name,
        movies.image,
        movies.released_at,
        movies.rating,
        array_agg(genres.genres_name),
        movies.language
      from
        movies
      inner join
        movies_genres on movies.id = movies_genres.movie_id
      inner join
        genres on movies_genres.genre_id = genres.id
      where
        movies.id = $1
      group by
        movies.id,
        movies.name,
        movies.image,
        movies.released_at,
        movies.rating,
        movies.language
        `,
      [movieSearch]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database connection",
    });
  }
}

export async function getMoviesByGenres(req, res) {
  let results;
  try {
    const genreName = req.params.genreName;
    results = await connectionPool.query(
      `
      SELECT movies.name
      FROM movies_genres
      INNER JOIN movies ON movies.id = movies_genres.movie_id
      INNER JOIN genres ON genres.id = movies_genres.genre_id
      WHERE genres.genres_name = $1
      GROUP BY movies.name
      `,
      [genreName]
    );
//127.0.0.1:4000/movies/genres/Drama

    if (results.rowCount === 0) {
      console.log("No movies found for genre:", genreName);
    } else {
      console.log("Movies found:", results.rows);
    }
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
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
      message: "Server could not read assignment because database connection",
    });
  }
}

export async function getCommentsById(req, res, next) {
  try {
    const commentId = req.params.commentId;
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
      message: "Server could not read question because database connection",
    });
  }
}

export async function getCommentsByMoviesId(req, res, next) {
  try {
    const movieId = req.params.commentMovieIdSearch;
    const results = await connectionPool.query(
      `
      select
        movies.name as name,
        users.name as username,
        comments.comment,
        comments.rating
      from
        comments_movies
      inner join movies on movies.id = comments_movies.movie_id
      inner join comments on comments.id = comments_movies.comment_id
      inner join users on users.id = comments.user_id
      WHERE movies.id = $1
      `,
      [movieId]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database connection",
    });
  }
}
