import { Router } from "express";
// import { getMoviesBySearchBar } from "../controllers/controller.mjs";
import { getMoviesBySearchBar } from "../controllers/searchbar.controller.mjs";
const searchBarRouter = Router();

searchBarRouter.get("/", getMoviesBySearchBar);

export default searchBarRouter;
