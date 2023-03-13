import { Router } from "express";
import { auth as middlewareAuth, isAdmin, productImgResize, uploadPhoto } from "../middlewares";
import {
  allProducts,
  getProductId,
  create,
  putProductId,
  deleteProductId,
  wishList,
  rating,
  uploadImgs,
} from "../controllers/product";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/upload/:id", middlewareAuth, isAdmin, uploadPhoto, productImgResize, uploadImgs);
router.put("/wishlist", middlewareAuth, wishList);
router.put("/rating", middlewareAuth, rating);
router.get("/:id", getProductId);
router.put("/:id", middlewareAuth, isAdmin, putProductId);
router.delete("/:id", middlewareAuth, isAdmin, deleteProductId);
router.get("/", allProducts);

export default router;
