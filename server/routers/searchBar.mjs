import { Router } from "express";
// import { getMoviesBySearchBar } from "../controllers/controller.mjs";
import { getMoviesBySearchBar } from "../controllers/searchbar.controller.mjs";
import { protect } from "../middlewares/protect.mjs";
const searchBarRouter = Router();
// searchBarRouter.use(protect);
searchBarRouter.get("/", getMoviesBySearchBar);

export default searchBarRouter;
