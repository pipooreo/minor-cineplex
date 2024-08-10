import connectionPool from "../utils/db.mjs";
export async function getMoviesReleased(req, res) {
  let results;
  try {
    results = await connectionPool.query(`
  SELECT 
      movies.id, 
      movies.title, 
      movies.image, 
      movies.theatrical_release::date AS theatrical_release,
      movies.out_of_theaters::date AS out_of_theaters,
      movies.rating, 
      (
          SELECT array_agg(DISTINCT genres.genres_name)
          FROM movies_genres
          INNER JOIN genres ON genres.id = movies_genres.genre_id
          WHERE movies_genres.movie_id = movies.id
      ) AS genres,
      movies.language,
    ROUND(AVG(comments.rating)::numeric, 1) AS average_rating FROM 
      movies
  LEFT JOIN 
      comments ON movies.id = comments.movie_id
  WHERE 
      CURRENT_TIMESTAMP BETWEEN 
          movies.theatrical_release::date AND 
          movies.out_of_theaters::date
  GROUP BY
      movies.id, 
      movies.title, 
      movies.image, 
      movies.theatrical_release,
      movies.out_of_theaters, 
      movies.rating,
      movies.language
  ORDER BY 
      movies.id
        `);
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get  the movies because database connection",
    });
  }
}
export async function getMoviesComingSoon(req, res) {
  let results;
  try {
    results = await connectionPool.query(`
        SELECT 
            movies.id, 
            movies.title, 
            movies.image, 
            movies.theatrical_release::date AS theatrical_release,
            movies.out_of_theaters::date AS out_of_theaters,
            movies.rating, 
            array_agg(genres.genres_name) AS genres,
            movies.language
        FROM 
            movies
        INNER JOIN
            movies_genres ON movies.id = movies_genres.movie_id
        INNER JOIN
            genres ON genres.id = movies_genres.genre_id
        WHERE 
            CURRENT_TIMESTAMP < movies.theatrical_release::date
        GROUP BY
            movies.id, 
            movies.title, 
            movies.image, 
            movies.theatrical_release,
            movies.out_of_theaters, 
            movies.rating,
            movies.language
        ORDER BY 
            movies.id;
  
        `);
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get  the movies because database connection",
    });
  }
}

export async function getMoviesById(req, res) {
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
