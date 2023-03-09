import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";

export const getBlogId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  validateMongo(id)
    const BlogId = await Blog.findById(id).populate('likes').populate("dislikes");
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: {
          views: 1,
        },
      },
      { new: true }
    );
    res.json({
      status: "success",
      BlogId,
    });
  } catch (err) {
    throw CError(err, "Get blog id");
  }
});
