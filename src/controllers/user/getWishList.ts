import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import User from "../../models/user";
import { validateMongo } from "../../utils/validateMongo";
///////////////////////////////////////////////////////////////////////////
export const getwishList = asyncHandler(async (req: RequestType, res: Response) => {

  const { id } = req.user;

  try {
    validateMongo(id)

    const findUser = await User.findById(id).populate("wishlist")

    res.json({
      status: "success",
      findUser,
    });

  } catch (err) {
    CustomError(res, err, "Get wish list");
  }
});
