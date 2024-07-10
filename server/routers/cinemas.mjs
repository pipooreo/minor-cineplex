import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { getCinemasAll, getCinemasById } from "../controllers/controller.mjs";
const cinemasRouter = Router();
cinemasRouter.get("/", getCinemasAll);
cinemasRouter.get("/:cinemaId", getCinemasById);

export default cinemasRouter;
