import { Router } from "express";
import { protect } from "../middlewares/protect.mjs";
import { getCoupons } from "../controllers/coupon.controller.mjs";
const couponsRouter = Router();

couponsRouter.get("/", getCoupons);

export default couponsRouter;
