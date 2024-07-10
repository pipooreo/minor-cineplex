import { Router } from "express";
import bcrypt from "bcrypt";
import connectionPool from "../utils/db.mjs";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  try {
    await connectionPool.query(
      `insert into users (name, password, email)
            values ($1, $2, $3)`,
      [user.name, user.password, user.email]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Server could not connect Database" });
  }
  return res.status(201).json({ message: "User created successfully" });
});

authRouter.get("/", (req, res) => {
  res.send("Hello wwwWorld!");
});


authRouter.get("/users", async (req, res) => {
  const results = await connectionPool.query(`select * from users`);
  res.status(200).json({ data: results.rows });
});

authRouter.get("/movies", async (req, res) => {
  const results = await connectionPool.query(`select * from movies`);
  res.status(200).json({ data: results.rows });
});

authRouter.get("/movies/:moviesId", async (req, res) => {
  let results;
  try {
    const movieId = req.params.moviesId;
    results = await connectionPool.query(`select * from movies where id = $1`, [
      movieId,
    ]);
    if (results.rowCount == 0) {
      return res.status(404).json({
        message: "Server could not find a requested movie",
      });
    }
    return res.status(200).json({
      data: results.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
});

authRouter.get("/cinemas", async (req, res) => {
  const results = await connectionPool.query(`select * from cinemas`);
  res.status(200).json({ data: results.rows });
});

authRouter.get("/genres", async (req, res) => {
  const results = await connectionPool.query(`select * from genres`);
  res.status(200).json({ data: results.rows });
});
authRouter.get("/movies_genres", async (req, res) => {
  const results = await connectionPool.query(`select * from movies_genres`);
  res.status(200).json({ data: results.rows });
});
authRouter.get("/comments", async (req, res) => {
  const results = await connectionPool.query(`select * from comments`);
  res.status(200).json({ data: results.rows });
});
authRouter.get("/city", async (req, res) => {
  const results = await connectionPool.query(`select * from city`);
  res.status(200).json({ data: results.rows });
});

export default authRouter;
