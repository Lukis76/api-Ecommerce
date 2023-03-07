import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/user";
import { CError } from "../../utils/err";
import { sendEmail } from "../email/sendEmail";

export const forgotPassToken = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");

    const token = await user.createPasswordToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='${process.env.BASE_URL}/api/user/resetpasswordtoken/${token}' >Click here</a>`;
    const data = {
      to: email,
      subject: "Forget password link",
      html: resetURL,
      text: `Hey ${user.firstname}`,
    };
    await sendEmail(data);
    res.json(token);
  } catch (err) {
    throw CError(err, "forget pass token user");
  }
});
