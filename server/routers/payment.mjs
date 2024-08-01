import { Router } from "express";

import {
  createPayment,
  getPayment,
  updatePayment,
} from "../controllers/payment.controller.mjs";

const paymentRouter = Router();

paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayment);
paymentRouter.put("/", updatePayment);

export default paymentRouter;
