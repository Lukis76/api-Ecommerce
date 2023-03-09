import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";

export const putBlogId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  validateMongo(id)
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      status: "success",
      updateBlog,
    });
  } catch (err) {
    throw CError(err, "Updated Blog");
  }
});
