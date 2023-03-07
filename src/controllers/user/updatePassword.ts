import { Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { RequestType } from "../../middlewares/auth";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";
////////////////////////////////////////////////////////////////////////////////////////
export const updatePassword = asyncHandler(async (req: RequestType, res: Response) => {
  //------------------------------------------------------------------------------------
  const { id } = req.user;
  const { password } = req.body;
  //----------------------------
  try {
    validateMongo(id);
    //-----------------------------------
    const user = await User.findById(id);
    //-----------------------------------
    if (password && user) {
      user.password = password;
      const updatePassword = await user?.save();
      res.json(updatePassword);
    } else {
      res.json(user);
    }
  } catch (err) {
    throw CError(err, "Updated password user");
  }
});
