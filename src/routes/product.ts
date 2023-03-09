import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import {
  allProducts,
  getProductId,
  create,
  putProductId,
  deleteProductId,
  wishList,
} from "../controllers/product";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/wishlist", middlewareAuth, wishList);
router.get("/:id", getProductId);
router.put("/:id", middlewareAuth, isAdmin, putProductId);
router.delete("/:id", middlewareAuth, isAdmin, deleteProductId);
router.get("/", allProducts);

export default router;
