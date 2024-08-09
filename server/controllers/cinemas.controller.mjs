import connectionPool from "../utils/db.mjs";

export async function getCinemasAll(res) {
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

