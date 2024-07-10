import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import {
  getCommentsAll,
  getCommentsById,
  getCommentsByMoviesId,
} from "../controllers/controller.mjs";
const commentRouter = Router();

commentRouter.get("/", getCommentsAll);
commentRouter.get("/:commentId", getCommentsById);
commentRouter.get(
  "/moviesComment/:commentMovieIdSearch",
  getCommentsByMoviesId
);

export default commentRouter;
