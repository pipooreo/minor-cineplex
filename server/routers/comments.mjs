import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";
import {
  getCommentsAll,
  getCommentsById,
  getCommentsByMoviesName,
} from "../controllers/controller.mjs";
const commentRouter = Router();
commentRouter.use(protect);
commentRouter.get("/", getCommentsAll);
commentRouter.get("/commentId", getCommentsById);
commentRouter.get("/moviesComment", getCommentsByMoviesName);

export default commentRouter;
