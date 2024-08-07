import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";
import {
  createComment,
  deleteComment,
  getCommentByUser,
  getCommentsAll,
  getCommentsById,
  getCommentsByMoviesName,
  updateComment,
  getCommentByMovie,
} from "../controllers/controller.mjs";
const commentRouter = Router();
commentRouter.use(protect);
commentRouter.get("/", getCommentsAll);
commentRouter.get("/commentId", getCommentsById);
commentRouter.get("/moviesComment", getCommentsByMoviesName);
commentRouter.get("/:userId", getCommentByUser);
commentRouter.get("/:userId/:movieId", getCommentByMovie);
commentRouter.post("/", createComment);
commentRouter.put("/", updateComment);
commentRouter.delete("/:commentId", deleteComment);

export default commentRouter;
