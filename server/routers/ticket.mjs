import { Router } from "express";
import { getInfoForBookTicket } from "../controllers/ticket.controller.mjs";
const ticketRouter = Router();

ticketRouter.get("/", getInfoForBookTicket);

export default ticketRouter;
