import { Router } from "express";

import {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
  createRefund,
} from "../controllers/payment.controller.mjs";

const paymentRouter = Router();

paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayment);
paymentRouter.put("/", updatePayment);
paymentRouter.delete("/", deletePayment);
paymentRouter.post("/refund", createRefund);

export default paymentRouter;
