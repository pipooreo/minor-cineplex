import { Router } from "express";
import {
  getCommentsAll,
  getCommentsById,
  getCommentsByMoviesName,
} from "../controllers/controller.mjs";
const commentRouter = Router();

commentRouter.get("/", getCommentsAll);
commentRouter.get("/commentId", getCommentsById);
commentRouter.get("/moviesComment", getCommentsByMoviesName);

export default commentRouter;
