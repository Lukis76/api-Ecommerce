import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import Cart from "../../models/cart";
import Coupon from "../../models/coupon";
import { validateMongo } from "../../utils/validateMongo";
/////////////////////////////////////////////////////////////////////////////////////
export const applyCoupon = asyncHandler(async (req: RequestType, res: Response) => {

  const { coupon } = req.body;
  const { id } = req.user;

  try {
    validateMongo(id);

    const validCoupon = await Coupon.findOne({ name: coupon });

    if (!validCoupon) throw new Error("Coupon invalid");

    const cart = await Cart.findOne({ orderBy: id }).populate("products.product");

    if (!cart) throw new Error("associated cart not found");

    const totalAfterDiscount = (
      cart.cartTotal -
      (cart.cartTotal * validCoupon.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate({ orderBy: id }, { totalAfterDiscount }, { new: true });

    res.json({
      status: "success",
      totalAfterDiscount,
    });

  } catch (err) {
    CustomError(res, err, "ApplyCoupon");
  }
});
