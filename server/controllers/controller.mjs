// cityController.js
import { Router } from "express";
import connectionPool from "../utils/db.mjs";

// CITY
export async function getCityAll(req, res, next) {
  try {
    const results = await connectionPool.query(
      `
      select
        city.id,
        city.city_name,
        cinemas.name,
        cinemas.address
      from cinemas
      inner join
        city_cinemas on cinemas.id = city_cinemas.cinema_id
      inner join
        city on city_cinemas.city_id = city.id`
    );
    return res.status(200).json({
      message: "data fetch succesfully",
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
}

export async function getCinemasByCity(req, res, next) {
  try {
    const citySearch = req.query.citySearch;
    const results = await connectionPool.query(
      `
      select
        city.id as city_i,
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
          movies_genres
        inner join
          movies ON movies.id = movies_genres.movie_id
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
    const movieSearch = req.query.movieSearch;
    console.log("result:", movieSearch);
    const results = await connectionPool.query(
      `
      select 
        movies.id,
        movies.title,
        movies.image,
        movies.theatrical_release,
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
        movies.title ilike $1
      group by
        movies.id,
        movies.title,
        movies.image,
        movies.theatrical_release,
        movies.rating,
        movies.language
        `,
      [`%${movieSearch}%`]
    );
    console.log("results2:, ", results);
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
      message:
        "Server could not find the desired movies because database connection",
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
      message: "Server could not read assignment because database connection",
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
      message: "Server could not read question because database connection",
    });
  }
}

export async function getCommentsByMoviesName(req, res, next) {
  try {
    const movieName = req.query.movieName;
    const results = await connectionPool.query(
      `
      select
        comments.movie_id,
        comments.id as comment_id,
        movies.title as moviesname,
        users.name as name,
        comments.comment,
        comments.rating
      from
        comments
      inner join movies on movies.id = comments.movie_id
      inner join users on users.id = comments.user_id
      WHERE movies.title ilike $1
      `,
      [`%${movieName}%`]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "There are no movie to display a comment",
      });
    }
    return res.status(200).json({
      message: "succesfully fetch comment from the selected movie",
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database connection",
    });
  }
}
