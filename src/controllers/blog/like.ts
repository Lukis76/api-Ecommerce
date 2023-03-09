import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";
import { RequestType } from "../../middlewares";

export const like = asyncHandler(async (req: RequestType, res: Response) => {
  const { blogId } = req.body;
  try {
    validateMongo(blogId);
    const blog = await Blog.findById(blogId);

    const loginUserId = req.user._id;

    const isLiked = blog?.isLiked;

    const allReadyDisLiked = blog?.dislikes?.find((userId) => userId === loginUserId);

    if (allReadyDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
    }

    if(isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );

    }
    res.json({
      status: "success"
    })
  } catch (err) {
    throw CError(err, "like blog");
  }
});
