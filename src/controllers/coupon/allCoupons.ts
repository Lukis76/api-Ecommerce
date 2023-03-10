import Coupon from "../../models/coupon";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";
///////////////////////////////////////////////////////////////////////////
export const allCoupons = asyncHandler(async (req: Request, res: Response) => {
  try {
    //-----------------------------------------------
    const allCoupon = await Coupon.find();
    //-----------------------------------------------
    if (!allCoupon) throw new Error("Get all coupon failed");
    //-----------------------------------------------
    res.json({ status: "success", allCoupon });
  } catch (err) {
    CustomError(res, err, "Get all coupon");
  }
});
//
