import Coupon from "../../models/coupon";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";
import { validateMongo } from "../../utils/validateMongo";
///////////////////////////////////////////////////////////////////////////////
export const putCoupon = asyncHandler(async (req: Request, res: Response) => {
  //--------------------------------------------------------------------------
  const { id } = req.params;
  //------------------------
  try {
    validateMongo(id);
    //-------------------------------------------------------------------------------
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    //-------------------------------------------------------------------------------
    if (!updateCoupon) throw new Error("Update coupon failed");
    //---------------------------------------------------------
    res.json({ status: "success", allCoupon: updateCoupon });
  } catch (err) {
    CustomError(res, err, "Update coupon");
  }
});
//
