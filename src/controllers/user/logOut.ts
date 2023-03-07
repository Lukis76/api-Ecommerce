import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../../models/user";
import { CError } from "../../utils/err";
////////////////////////////////////////////////////////////////////////////
export const logOut = asyncHandler(async (req: Request, res: Response) => {
  //------------------------------------------------------------------------
  const { refreshToken } = req.cookies;
  try {
    //----------------------------------------------------------------
    if (!refreshToken) throw new Error("No refresh token in cookies");
    //----------------------------------------------------------------
    await User.findOneAndUpdate(refreshToken, { refreshToken: "" });
    //---------------------------------------------------------------
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    //------------------
    res.sendStatus(204);
  } catch (err) {
    throw CError(err, "LogOut user");
  }
});
