import { Router } from "express";
import connectionPool from "../utils/db.mjs";
const cityRouter = Router();

cityRouter.get("/", async (req, res) => {
  try {
    const results = await connectionPool.query(`select 
      city.city_name,
      cinemas.name,
        cinemas.address
      from cinemas
      inner join
        city_cinemas on cinemas.id = city_cinemas.cinema_id
      inner join
      city on city_cinemas.city_id = city.id
      `);
    // * from city
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
});

cityRouter.get("/:citySearch", async (req, res) => {
  let results;
  try {
    const citySearch = req.params.citySearch;
    results = await connectionPool.query(
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
});
// cityRouter.get("/:citySearch", async (req, res) => {
//   let results;
//   try {
//     const citySearch = req.params.citySearch;
//     const cityId = isNaN(parseInt(citySearch)) ? null : parseInt(citySearch);
//     results = await connectionPool.query(
//       `select * from city where city_name = $1 or id = $2`,
//       [citySearch, cityId]
//     );
//     if (results.rowCount == 0) {
//       return res.status(404).json({
//         message: "City not found",
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

export default cityRouter;
