import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";

import {
  getMoviesReleased,
  getMoviesComingSoon,
  getMoviesById,
  getMoviesByGenres,
} from "../controllers/movies.controller.mjs";
const moviesRouter = Router();

moviesRouter.get("/release", getMoviesReleased);
moviesRouter.get("/comingSoon", getMoviesComingSoon);
moviesRouter.get("/genres", [protect], getMoviesByGenres);
moviesRouter.get("/movie", getMoviesById);

export default moviesRouter;
