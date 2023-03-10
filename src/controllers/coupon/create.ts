import Coupon from "../../models/coupon";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";
///////////////////////////////////////////////////////////////////////////
export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    //-----------------------------------------------
    const newCoupon = await Coupon.create(req.body);
    //-----------------------------------------------
    if (!newCoupon) throw new Error("Created new coupon failed");
    //-----------------------------------------------
    res.json({ status: "success", newCoupon });
  } catch (err) {
    CustomError(res, err, "created coupon");
  }
});
