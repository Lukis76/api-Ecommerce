import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import User from "../../models/user";
///////////////////////////////////////////////////////////////////////////
export const wishList = asyncHandler(async (req: RequestType, res: Response) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    //-----------------------------------------------
    const user = await User.findById(id);
    const allReadyAdded = user?.wishlist.find((id) => id.toString() === productId);

    if (allReadyAdded) {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: productId },
        },
        { new: true }
      );

      res.json({
        status: "success",
        WishListdeleteProduct: user,
        deleteProduct: allReadyAdded,
      });
    } else {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishlist: productId },
        },
        { new: true }
      );

      res.json({
        status: "success",
        WishListAddProduct: user,
      });
    }
  } catch (err) {
    CustomError(res, err, "add or delete wish list");
  }
});
