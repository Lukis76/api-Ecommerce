import User from "../../../models/user";
import { Response } from "express";
import { RequestType } from "../../../middlewares/auth";
import { validateMongo } from "../../../utils/validateMongo";
/////////////////////////////////////////////////////////////////////
export const putUserId = async (req:RequestType, res: Response) => {
  //-----------------------------------------------------------------
  const { id } = req.user
  const user = req.body
  //-------------------
  validateMongo(id)
  //------------------------------------------------------------------------------
  const updateUser = await User.findByIdAndUpdate(id, { ...user }, { new: true });
  res.json(updateUser);
};
