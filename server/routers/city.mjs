import { Router } from "express";
import { getCityAll, getCinemasByCity } from "../controllers/city.controllers.mjs";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";
// const express = require("express");
const cityRouter = Router();
cityRouter.get("/", getCityAll);
cityRouter.get("/filteredCinema", [protect], getCinemasByCity);
export default cityRouter;
