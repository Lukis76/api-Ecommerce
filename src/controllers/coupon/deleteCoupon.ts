
import Coupon from "../../models/coupon";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";
import { validateMongo } from "../../utils/validateMongo";
///////////////////////////////////////////////////////////////////////////////
export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  //--------------------------------------------------------------------------
  const { id } = req.params;
  //------------------------
  try {
    validateMongo(id);
    //-------------------------------------------------------------------------------
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    //-------------------------------------------------------------------------------
    if (!deleteCoupon) throw new Error("Delete coupon failed");
    //---------------------------------------------------------
    res.json({ status: "success", allCoupon: deleteCoupon });
  } catch (err) {
    CustomError(res, err, "Delete coupon");
  }
});
//
