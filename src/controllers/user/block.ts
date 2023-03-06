import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { validateMongo } from "../../utils/validateMongo";
///////////////////////////////////////////////////////////////////////////
export const block = asyncHandler(async (req: Request, res: Response) => {
  //----------------------------------------------------------------------
  const { id } = req.params;
  //------------------------
  validateMongo(id);
  //----------------
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
