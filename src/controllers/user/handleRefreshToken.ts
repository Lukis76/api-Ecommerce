import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { generateToken } from "../../config/jwtToken";
import { CError } from "../../utils/err";
////////////////////////////////////////////////////////////////////////////////////////
export const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    //------------------------------------------------------------------------------------
    const { refreshToken } = req.cookies;
    //----------------------------------------------------------------
    if (!refreshToken) throw new Error("No refresh token in cookies");
    //----------------------------------------------------------------
    const user = await User.findOne({ refreshToken });
    //-------------------------------------------------------------------------
    if (!user) throw new Error("No refresh token preset in db or not matched");
    //------------------------------------------------------------------------
    verify(
      refreshToken,
      process.env.JWT_SECRET as string,
      (err: JsonWebTokenError | null, decode: any) => {
        if (err || user?.id !== decode?.id) {
          throw new Error("There is something wrong with refresh token");
        } else {
          const accessToken = generateToken(user?.id);
          res.json({ accessToken });
        }
      }
    );
  } catch (err) {
    throw CError(err, "Refresh Token");
  }
});
