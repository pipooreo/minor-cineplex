import { Router } from "express";
import { protect } from "../middlewares/protect.mjs";
import {
  createPayment,
  updatePaymentQR,
  getPayment,
  updatePayment,
  deletePayment,
  getPaymentSuccess,
  createRefund,
} from "../controllers/payment.controller.mjs";
import { processPayment } from "../controllers/processpayment.controller.mjs";
const paymentRouter = Router();
paymentRouter.use(protect);
paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayment);
paymentRouter.put("/", updatePayment);
paymentRouter.put("/qr", updatePaymentQR);
paymentRouter.post("/process-payment", processPayment);
paymentRouter.delete("/", deletePayment);
paymentRouter.get("/success", getPaymentSuccess);
paymentRouter.post("/refund", createRefund);

export default paymentRouter;
