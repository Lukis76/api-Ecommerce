import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import User from "../../models/user";
import Product from "../../models/product";
///////////////////////////////////////////////////////////////////////////
export const rating = asyncHandler(async (req: RequestType, res: Response) => {
  try {
    const { id } = req.user;
    const { start, productId } = req.body;
    //-----------------------------------------------
    const product = await Product.findById(productId);
    const allReadyRating = product?.rating.find((r) => r.postBy.toString() === id.toString());
    if (allReadyRating) {
      await Product.updateOne(
        {
          rating: {
            $elemMatch: allReadyRating,
          },
        },
        {
          $set: {
            "rating.$.start": start,
          },
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            rating: {
              start,
              postBy: id,
            },
          },
        },
        { new: true }
      );
    }

    const allRatings = await Product.findById(productId);
    const totalRatings = Number(allRatings?.rating?.length);
    const ratingsSum = Number(
      allRatings?.rating.map((r) => r.start).reduce((prev, curr) => prev + curr, 0)
    );
    const actualRating = Math.round(ratingsSum / totalRatings);
    const finalProduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );

    res.json({
      status: "success",
      finalProduct,
    });
  } catch (err) {
    CustomError(res, err, "add or delete wish list");
  }
});
