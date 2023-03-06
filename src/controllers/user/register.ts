
import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../../models/user";
////////////////////////////////////////////////////////////////////////////////
export const register = asyncHandler(async (req: Request, res: Response) => {
  //---------------------------------------------------------------------------
  const { email } = req.body;
  //-----------------------------------------
  try {
    const findUser = await User.findOne({ email });

    if (findUser) throw new Error("User already exist!");

    // create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    throw new Error(err?.toString() || "Error inesperado");
  }
});
