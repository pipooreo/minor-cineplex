import connectionPool from "../utils/db.mjs";
export async function getInfoForBookTicket(req, res) {
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
