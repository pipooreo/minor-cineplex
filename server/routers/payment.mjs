import { Router } from "express";

import {
  createPayment,
  getPayment,
} from "../controllers/payment.controller.mjs";

const paymentRouter = Router();

paymentRouter.post("/", createPayment);
paymentRouter.get("/", getPayment);

export default paymentRouter;
