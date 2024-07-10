import { Router } from "express";
import { getCityAll, getCinemasByCity } from "../controllers/controller.mjs";
import connectionPool from "../utils/db.mjs";
// const express = require("express");
const cityRouter = Router();
cityRouter.get("/", getCityAll);
cityRouter.get("/:citySearch", getCinemasByCity);
export default cityRouter;
