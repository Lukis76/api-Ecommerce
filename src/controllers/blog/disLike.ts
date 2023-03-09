
import Blog from "../../models/blog";
import User from "../../models/user";
import asyncHandler from "express-async-handler";
import { Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";
import { RequestType } from "../../middlewares";

export const disLike = asyncHandler(async (req: RequestType, res: Response) => {
  const { blogId } = req.body;
  try {
    validateMongo(blogId);
    const blog = await Blog.findById(blogId);

    const loginUserId = req.user._id;

    const isDisLiked = blog?.isDisliked;

    const allReadyLiked = blog?.likes?.find((userId) => userId === loginUserId);

    if (allReadyLiked) {
      await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
    }

    if(isDisLiked) {
      await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
    } else {
      await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisLiked: true,
        },
        { new: true }
      );

    }
    res.json({
      status: "success"
    })
  } catch (err) {
    throw CError(err, "disLike blog");
  }
});
