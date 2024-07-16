import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionPool from "./utils/db.mjs";
import authRouter from "./routers/auth.mjs";
import moviesRouter from "./routers/movies.mjs";
import cinemasRouter from "./routers/cinemas.mjs";
import cityRouter from "./routers/city.mjs";
import commentRouter from "./routers/comments.mjs";
import searchBarRouter from "./routers/searchBar.mjs";
import daysRouter from "./routers/days.mjs";
// import getMoviesScreenTime from "./routers/ticket.mjs";
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movies", moviesRouter);
app.use("/cinemas", cinemasRouter);
app.use("/comments", commentRouter);
app.use("/city", cityRouter);
app.use("/search", searchBarRouter);
app.use("/days", daysRouter);
// app.use("/date", getMoviesScreenTime);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
