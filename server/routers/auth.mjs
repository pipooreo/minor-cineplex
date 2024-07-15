import { Router } from "express";
import {
  login,
  register,
  requestPassword,
  resetPassword,
} from "../controllers/auth.controller.mjs";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/request-reset-password", requestPassword);

authRouter.post("/reset-password", resetPassword);

export default authRouter;
