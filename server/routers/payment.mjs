import { Router } from "express";

import {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller.mjs";

const paymentRouter = Router();

paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayment);
paymentRouter.put("/", updatePayment);
paymentRouter.delete("/", deletePayment);

export default paymentRouter;
