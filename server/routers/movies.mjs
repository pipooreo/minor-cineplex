import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const results = await connectionPool.query(`
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
          genres ON genres.id = movies_genres.genres_id
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
});

moviesRouter.get("/:moviesId", async (req, res) => {
  let results;
  try {
    const moviesId = req.params.moviesId;
    console.log("fucking movId is :", moviesId);
    results = await connectionPool.query(
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
        genres on movies_genres.genres_id = genres.id
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
      [moviesId]
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
});

// moviesRouter.get("/genres", async (req, res) => {
//     try {
//       const results = await connectionPool.query(`select * from genres`);
//       res.status(200).json({ data: results.rows });
//     } catch (error) {
//       return res.status(500).json({
//         message: "Server could not read assignment because database connection",
//       });
//     }
//   });

moviesRouter.get("/genres/:moviesGenres", async (req, res) => {
  let results;
  try {
    const moviesGenres = req.params.moviesGenres;
    results = await connectionPool.query(
      `select * from genres where genres_name = $1`,
      [moviesGenres]
    );
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Movie not found",
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
});

export default moviesRouter;
