import { Router } from "express";
import connectionPool from "../utils/db.mjs";
const commentRouter = Router();

commentRouter.get("/", async (req, res) => {
  try {
    const results =
      await connectionPool.query(`select users.name, comments.comment, comments.rating
      from comments
      inner join users on comments.user_id = users.id`);
    res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
});

commentRouter.get("/:commentId", async (req, res) => {
  let results;
  try {
    const commentId = req.params.commentId;
    results = await connectionPool.query(
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
});

export default commentRouter;
