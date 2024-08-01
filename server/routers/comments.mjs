import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";
import {
  createComment,
  getCommentByUser,
  getCommentsAll,
  getCommentsById,
  getCommentsByMoviesName,
  updateComment,
} from "../controllers/controller.mjs";
const commentRouter = Router();
commentRouter.use(protect);
commentRouter.get("/", getCommentsAll);
commentRouter.get("/commentId", getCommentsById);
commentRouter.get("/moviesComment", getCommentsByMoviesName);
commentRouter.get("/:userId", getCommentByUser);
commentRouter.post("/", createComment);
commentRouter.put("/", updateComment);

export default commentRouter;
