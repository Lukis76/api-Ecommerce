
import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import {
  create,
} from "../controllers/coupon";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);

export default router;
