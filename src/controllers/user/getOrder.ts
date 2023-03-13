import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import { validateMongo } from "../../utils/validateMongo";
import Cart from "../../models/cart";
/////////////////////////////////////////////////////////////////////////////////
export const getOrder = asyncHandler(async (req: RequestType, res: Response) => {
  const { id } = req.user;

  try {
    validateMongo(id);

    const userOrders = await Cart.findOne({ orderBy: id }).populate("products.product").exec();

    res.json({
      status: "success",
      userOrders,
    });
  } catch (err) {
    CustomError(res, err, "All orders");
  }
});
