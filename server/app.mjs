import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionPool from "./utils/db.mjs";
import authRouter from "./routers/auth.mjs";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const results = await connectionPool.query(`select * from users`);
  res.status(200).json({ data: results.rows });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
