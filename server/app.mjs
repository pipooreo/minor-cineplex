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

app.use("/get", authRouter);

app.use("/movies", moviesRouter); //done
app.use("/cinemas", cinemasRouter); //done

app.get("/cinemas/:city", cinemasRouter);

app.use("/comments", commentRouter); //done
app.use("/comments/:commentId", commentRouter); //done
app.use("/comments/moviesComment/:commentMovieIdSearch", commentRouter); //done
app.use("/city", cityRouter); //done
app.use("/city/:id", cityRouter); //done

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
