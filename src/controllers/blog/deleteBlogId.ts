import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";

export const deleteBlogId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  validateMongo(id)
    const deleteBlogId = await Blog.findByIdAndDelete(id);
    res.json({
      status: "success",
      deleteBlogId,
    });
  } catch (err) {
    throw CError(err, "Get all blogs");
  }
});
