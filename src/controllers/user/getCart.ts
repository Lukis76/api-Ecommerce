import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import { validateMongo } from "../../utils/validateMongo";
import Cart from "../../models/cart";
/////////////////////////////////////////////////////////////////////////////////
export const getCart = asyncHandler(async (req: RequestType, res: Response) => {
  const { id } = req.user;

  try {
    validateMongo(id);

    const findCart = await Cart.findOne({ orderBy: id }).populate("products.product");

    res.json({
      status: "success",
      findCart,
    });
  } catch (err) {
    CustomError(res, err, "Get Cart");
  }
});
