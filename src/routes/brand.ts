import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import { create, putBrandId, deleteBrandId, getBrandId, allBrand } from "../controllers/brand";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/:id", middlewareAuth, isAdmin, putBrandId);
router.delete("/:id", middlewareAuth, isAdmin, deleteBrandId);
router.get("/:id", getBrandId);
router.get("/", allBrand);

export default router;
