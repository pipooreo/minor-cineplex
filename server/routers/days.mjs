import { Router } from "express";
import { getDaysAll } from "../controllers/days.controller.mjs";
const daysRouter = Router();
daysRouter.get("/", getDaysAll);

export default daysRouter;
