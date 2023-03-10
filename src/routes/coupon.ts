import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import { create, allCoupons, putCoupon } from "../controllers/coupon";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.get("/", allCoupons);
router.put("/:id", middlewareAuth, isAdmin, putCoupon);

export default router;
