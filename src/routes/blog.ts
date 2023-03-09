import { Router } from "express";
import { auth as middlewareAuth, isAdmin } from "../middlewares/auth";
import { create, putBlogId, getBlogId, allBlogs, deleteBlogId, like, disLike } from "../controllers/blog";

const router = Router();

router.post("/create", middlewareAuth, isAdmin, create);
router.put("/like", middlewareAuth, like);
router.put("/dislike", middlewareAuth, disLike);
router.put("/:id", middlewareAuth, isAdmin, putBlogId);
router.get("/:id", getBlogId);
router.get("/", allBlogs);
router.delete("/:id", middlewareAuth, isAdmin, deleteBlogId);

export default router;
