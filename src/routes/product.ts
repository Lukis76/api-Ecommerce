import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import {
  allProducts,
  getProductId,
  create,
  putProductId,
  deleteProductId,
  wishList,
  rating,
} from "../controllers/product";
import { productImgResize, uploadPhoto } from "../middlewares/uploadImgs";
import { uploadImgs } from "../controllers/product/uploadImgs";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put(
  "/upload/:id",
  middlewareAuth,
  isAdmin,
  uploadPhoto,
  productImgResize,
  uploadImgs
);
router.put("/wishlist", middlewareAuth, wishList);
router.put("/rating", middlewareAuth, rating);
router.get("/:id", getProductId);
router.put("/:id", middlewareAuth, isAdmin, putProductId);
router.delete("/:id", middlewareAuth, isAdmin, deleteProductId);
router.get("/", allProducts);

export default router;
