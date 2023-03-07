import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../../models/user";
import { CError } from "../../utils/err";
///////////////////////////////////////////////////////////////////////////////
export const allUsers = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    throw CError(err, "Get all users");
  }
});
