import { generateToken } from "../../config/jwtToken";
import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../../models/user";
import { refreshToken } from "../../config/refreshToken";
import { CError } from "../../utils/err";
///////////////////////////////////////////////////////////////////////////////
export const login = asyncHandler(async (req: Request, res: Response) => {
  //==========================================================================
  const { email, password } = req.body;
  //===================================
  try {
    // Check user exist
    const findUser = await User.findOne({ email });
    //=============================================
    //@ts-ignore
    const checkPass = await findUser.isPasswordMatched(password);
    //===========================================================
    if (findUser && checkPass) {
      //-----------------------------------------------
      const refToken = await refreshToken(findUser.id);
      //-----------------------------------------------
      await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refToken,
        },
        {
          new: true,
        }
      );
      //-------------------------------------
      res.cookie("refreshToken", refToken, {
        httpOnly: true, // access not navigator
        maxAge: 72 * 60 * 60 * 1000, // time expired cookie
        // secure: true,  // Production
        // sameSite: "lax" // dist domains
      });
      //-----------------------------------
      res.json({
        id: findUser.id,
        firstname: findUser.firstname,
        lastname: findUser.lastname,
        email: findUser.email,
        mobile: findUser.mobile,
        role: findUser.role,
        token: generateToken(findUser.id.toString()),
      });
      //-----------------------------------------------
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    throw CError(err, "Login user");
  }
});
