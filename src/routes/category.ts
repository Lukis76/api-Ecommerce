import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import { create, putCategoryId, deleteCategoryId, getCategoryId } from "../controllers/category";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/:id", middlewareAuth, isAdmin, putCategoryId);
router.delete("/:id", middlewareAuth, isAdmin, deleteCategoryId);
router.get("/:id", middlewareAuth, isAdmin, getCategoryId);

export default router;
