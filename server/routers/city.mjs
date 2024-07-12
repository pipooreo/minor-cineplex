import { Router } from "express";
import { getCityAll, getCinemasByCity } from "../controllers/controller.mjs";
// const express = require("express");
const cityRouter = Router();
cityRouter.get("/", getCityAll);
cityRouter.get("/filteredCinema", getCinemasByCity);
export default cityRouter;
