
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { RequestType } from "../../middlewares/auth"
import { validateMongo } from "../../utils/validateMongo";
///////////////////////////////////////////////////////////////////////////
export const updatePassword = asyncHandler(async (req: RequestType, res: Response) => {
  //----------------------------------------------------------------------
  const {id} = req.user
  const {password} = req.body
  
  validateMongo(id)

  const user = await User.findById(id)

  if(password && user) {
    user.password = password
    const updatePassword = await user?.save()
    res.json(updatePassword)
  } else {
    res.json(user)
  }










  try {
    const block = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    //---------------------------------------------------------------------------------
    res.json({
      msg: "User Blocked",
    });
  } catch (err) {
    throw new Error(err as string);
  }
});
