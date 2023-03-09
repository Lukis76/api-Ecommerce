import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";

export const allBlogs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json({
      status: "success",
      blogs,
    });
  } catch (err) {
    throw CError(err, "Get all blogs");
  }
});
