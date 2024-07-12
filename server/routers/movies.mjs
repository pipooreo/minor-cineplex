import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";

import {
  getMoviesAll,
  getMoviesById,
  getMoviesByGenres,
} from "../controllers/controller.mjs";
const moviesRouter = Router();

moviesRouter.get("/", getMoviesAll);
moviesRouter.get("/genres", [protect], getMoviesByGenres);
moviesRouter.get("/movie", [protect], getMoviesById);

export default moviesRouter;
