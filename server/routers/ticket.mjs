import { Router } from "express";
import { getInfoForBookTicket } from "../controllers/ticket.controller.mjs";
import { protect } from "../middlewares/protect.mjs";
const ticketRouter = Router();
// ticketRouter.use(protect);
ticketRouter.get("/", getInfoForBookTicket);

export default ticketRouter;
