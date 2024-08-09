import connectionPool from "../utils/db.mjs";

export async function getDaysAll(res) {
  try {
    const results = await connectionPool.query(
      `
         SELECT
        days.day_name from days
        `
    );
    return res.status(200).json({
      message: "data fetch succesfully",
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not get days because database connection",
    });
  }
}
