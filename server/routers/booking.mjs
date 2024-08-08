import { Router } from "express";
import {
  BookingHistory,
  bookingReserved,
  dataSeat,
  deleteBooking,
  updateBooking,
} from "../controllers/booking.controller.mjs";
import { protect } from "../middlewares/protect.mjs";

const bookRouter = Router();
bookRouter.use(protect);
bookRouter.get("/", dataSeat);
bookRouter.post("/", bookingReserved);
bookRouter.put("/", updateBooking);
bookRouter.delete("/", deleteBooking);
bookRouter.get("/:userId", BookingHistory);

export default bookRouter;
