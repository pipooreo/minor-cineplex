import connectionPool from "../utils/db.mjs";
export async function getCityAll(req, res) {
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

export async function getCinemasByCity(req, res) {
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
