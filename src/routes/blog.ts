import { Router } from "express";
import { auth as middlewareAuth, isAdmin, blogImgResize, uploadPhoto } from "../middlewares";
import {
  create,
  putBlogId,
  getBlogId,
  allBlogs,
  deleteBlogId,
  like,
  disLike,
  uploadImgs,
} from "../controllers/blog";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/upload/:id", middlewareAuth, isAdmin, uploadPhoto, blogImgResize, uploadImgs);
router.put("/like", middlewareAuth, like);
router.put("/dislike", middlewareAuth, disLike);
router.put("/:id", middlewareAuth, isAdmin, putBlogId);
router.get("/:id", getBlogId);
router.get("/", allBlogs);
router.delete("/:id", middlewareAuth, isAdmin, deleteBlogId);

export default router;
