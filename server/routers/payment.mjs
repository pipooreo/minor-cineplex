import { Router } from "express";

import {
  createPayment,
  updatePaymentQR,
  getPayment,
  updatePayment,
  deletePayment,
  createRefund,
} from "../controllers/payment.controller.mjs";
import {
  processPayment,
} from "../controllers/processpayment.controller.mjs";
const paymentRouter = Router();

paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayment);
paymentRouter.put("/", updatePayment);
paymentRouter.put("/", updatePaymentQR);
paymentRouter.post("/process-payment", processPayment);
paymentRouter.delete("/", deletePayment);
paymentRouter.post("/refund", createRefund);

export default paymentRouter;
