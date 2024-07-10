import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const cinemasRouter = Router();

cinemasRouter.get("/", async (req, res) => {
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
});

cinemasRouter.get("/:cinemaId", async (req, res) => {
  let results;
  try {
    const cinemaId = req.params.cinemaId;
    results = await connectionPool.query(
      `select * from cinemas where id = $1`,
      [cinemaId]
    );
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
      message: "Server could not read question because database connection",
    });
  }
});
// cinemasRouter.get("/:cinemaId", async (req, res) => {
//   let results;
//   try {
//     const cinemaId = req.params.cinemaId;
//     results = await connectionPool.query(
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
//       message: "Server could not read question because database connection",
//     });
//   }
// });

export default cinemasRouter;
