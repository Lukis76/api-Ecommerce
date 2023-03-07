import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { CError } from "../../utils/err";
import { validateMongo } from "../../utils/validateMongo";
/////////////////////////////////////////////////////////////////////////////
export const unBlock = asyncHandler(async (req: Request, res: Response) => {
  //------------------------------------------------------------------------
  const { id } = req.params;
  //------------------------
  validateMongo(id);
  //----------------
  try {
    await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    //------------------------------------------------------------------------------------
    res.json({
      msg: "User Unblocked",
    });
  } catch (err) {
    throw CError(err, "Unblocked user");
  }
});
