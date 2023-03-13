import asyncHandler from "express-async-handler";
import { Response, NextFunction } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import User from "../../models/user";
import { validateMongo } from "../../utils/validateMongo";
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const address = asyncHandler(async (req: RequestType, res: Response, next: NextFunction) => {

  const { id } = req.user;
  const { address } = req.body;

  try {

    validateMongo(id);

    if (!address) throw new Error("addres invalid");

    const findUser = await User.findByIdAndUpdate(id, { address }, { new: true });

    res.json({
      status: "success",
      findUser,
    });

  } catch (err) {
    CustomError(res, err, "Get wish list");
  }
});
