import { Router } from "express";
import { bookSeat } from "../controllers/booking.controller.mjs";
import { protect } from "../middlewares/protect.mjs";

const bookRouter = Router();

bookRouter.get("/", bookSeat);
bookRouter.put("/", bookSeat);

export default bookRouter;
