import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createHash } from "crypto";
import User from "../../models/user";
import { CError } from "../../utils/err";


export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;
  
  try {
    
   const hashedToken = createHash('sha256').update(token).digest("hex")
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  if(!user) throw new Error("Token expired, Please try again later")

  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  res.json(user)



 } catch (err) {
    
    throw CError(err, "Reset password");
  }

});
