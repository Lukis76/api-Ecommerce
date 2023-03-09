import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import { create, putCategoryId, deleteCategoryId, getCategoryId, allCategory } from "../controllers/category";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/:id", middlewareAuth, isAdmin, putCategoryId);
router.delete("/:id", middlewareAuth, isAdmin, deleteCategoryId);
router.get("/:id", getCategoryId);
router.get("/", allCategory);

export default router;
