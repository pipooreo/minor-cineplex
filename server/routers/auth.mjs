import { Router } from "express";
import {
  getUserById,
  login,
  register,
  requestPassword,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/auth.controller.mjs";
import multer from "multer";
import { protect } from "../middlewares/protect.mjs";

const authRouter = Router();
const multerUpload = multer({ dest: "public\\files" });
const avatarUpload = multerUpload.fields([{ name: "image", maxCount: 1 }]);

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/request-reset-password", requestPassword);

authRouter.post("/reset-password", resetPassword);

authRouter.put("/update-password", [protect], updatePassword);

authRouter.put("/update-profile", [avatarUpload], updateProfile);

authRouter.get("/users/:userId", [protect], getUserById);

export default authRouter;
