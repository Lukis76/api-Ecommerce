import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../../models/user";
///////////////////////////////////////////////////////////////////////////////
export const allUsers = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    throw new Error(err?.toString() || "Error inesperado");
  }
});
