import { Router } from "express";
import {
  getCinemasAll,
  getCinemasById,
} from "../controllers/cinemas.controller.mjs";
import { protect } from "../middlewares/protect.mjs";
const cinemasRouter = Router();
cinemasRouter.get("/", getCinemasAll);
cinemasRouter.get("/cinema", getCinemasById);

export default cinemasRouter;
