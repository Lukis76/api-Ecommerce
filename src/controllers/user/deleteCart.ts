import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import { validateMongo } from "../../utils/validateMongo";
import Cart from "../../models/cart";
/////////////////////////////////////////////////////////////////////////////////
export const deleteCart = asyncHandler(async (req: RequestType, res: Response) => {
  const { id } = req.user;

  try {
    validateMongo(id);

    const deleteCart = await Cart.findOneAndRemove({ orderBy: id });

    res.json({
      status: "success",
      deleteCart,
    });
  } catch (err) {
    CustomError(res, err, "Empty Cart");
  }
});
