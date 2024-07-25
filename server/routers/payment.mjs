import { Router } from "express";

import { getPayment } from "../controllers/payment.controller.mjs";

const paymentRouter = Router();

paymentRouter.post("/", getPayment);

export default paymentRouter;
