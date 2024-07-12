import { Router } from "express";

import {
  getMoviesAll,
  getMoviesById,
  getMoviesByGenres,
} from "../controllers/controller.mjs";
const moviesRouter = Router();

moviesRouter.get("/", getMoviesAll);
moviesRouter.get("/genres", getMoviesByGenres);
moviesRouter.get("/movie", getMoviesById);

export default moviesRouter;
