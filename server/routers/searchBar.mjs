import { Router } from "express";
import { getMoviesBySearchBar } from "../controllers/controller.mjs";
const searchBarRouter = Router();

searchBarRouter.get("/", getMoviesBySearchBar);

export default searchBarRouter;
