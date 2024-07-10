import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { getCinemasAll, getCinemasById } from "../controllers/controller.mjs";
const cinemasRouter = Router();
cinemasRouter.get("/", getCinemasAll);
cinemasRouter.get("/cinemas/:cinemaId", getCinemasById);

export default cinemasRouter;
