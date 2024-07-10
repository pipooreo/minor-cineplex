import { Router } from "express";
import connectionPool from "../utils/db.mjs";

import {
  getMoviesAll,
  getMoviesById,
  getMoviesByGenres,
} from "../controllers/controller.mjs";
const moviesRouter = Router();

moviesRouter.get("/", getMoviesAll);
moviesRouter.get("/:movieSearch", getMoviesById);
moviesRouter.get("/genres/:moviesGenres", getMoviesByGenres);

export default moviesRouter;
