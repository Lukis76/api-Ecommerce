import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";

export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (err) {
    throw CError(err, "Created Blog");
  }
});
