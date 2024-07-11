import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionPool from "./utils/db.mjs";
import authRouter from "./routers/auth.mjs";
import moviesRouter from "./routers/movies.mjs";
import cinemasRouter from "./routers/cinemas.mjs";
import cityRouter from "./routers/city.mjs";
import commentRouter from "./routers/comments.mjs";
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movies", moviesRouter); //done query done
app.use("/cinemas", cinemasRouter); //done query done
app.use("/comments", commentRouter); //done query donne
app.use("/city", cityRouter); //done qeury done

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
