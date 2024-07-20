import { Router } from "express";
import {
  bookingReserved,
  dataSeat,
  deleteBooking,
  updateBooking,
} from "../controllers/booking.controller.mjs";
import { protect } from "../middlewares/protect.mjs";

const bookRouter = Router();

bookRouter.get("/", dataSeat);
bookRouter.post("/", bookingReserved);
bookRouter.put("/", updateBooking);
bookRouter.delete("/", deleteBooking);

export default bookRouter;
