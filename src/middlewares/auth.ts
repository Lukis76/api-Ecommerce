import User from "../models/user";
import { JwtPayload, verify } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
//////////////////////////////////////////////////////
export interface RequestType extends Request {
  user?: any;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
export const auth = asyncHandler(async (req: RequestType, res: Response, next: NextFunction) => {
  //=============================================================================================
  let token;
  //====================================================
  if (req.headers.authorization?.startsWith("Bearer")) {
    //--------------------------------------------------
    token = req.headers.authorization.split(" ")[1];
    //----------------------------------------------
    try {
      if (token) {
        //---------------------------------------------------------------------------
        const decode = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        //---------------------------------------------------------------------------
        const user = await User.findById(decode?.id);
        //-------------------------------------------
        req.user = user;
        //--------------
        next();
      }
    } catch (err) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const isAdmin = asyncHandler(async (req: RequestType, res: Response, next: NextFunction) => {
  //-------------------------------------------------------------------------------------------------
  const { email } = req.user;
  //----------------------------------------------
  const adminUser = await User.findOne({ email });
  //----------------------------------------------
  if (adminUser?.role === "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
