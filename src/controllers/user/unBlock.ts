import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { validateMongo } from "../../utils/validateMongo";
/////////////////////////////////////////////////////////////////////////////
export const unBlock = asyncHandler(async (req: Request, res: Response) => {
  //------------------------------------------------------------------------
  const { id } = req.params;
  //------------------------
  validateMongo(id);
  //----------------
  try {
    const unBlock = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    //------------------------------------------------------------------------------------
    res.json({
      msg: "User Unblocked",
    });
  } catch (err) {
    throw new Error(err as string);
  }
});
