import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import Product from "../../models/product";
///////////////////////////////////////////////////////////////////////////
export const rating = asyncHandler(async (req: RequestType, res: Response) => {
  try {
    const { id } = req.user;
    const { start, comment, productId } = req.body;
    //-----------------------------------------------
    const product = await Product.findById(productId);
    const allReadyRating = product?.ratings.find((r) => r.postBy.toString() === id.toString());
    if (allReadyRating) {
      await Product.updateOne(
        {
          rating: {
            $elemMatch: allReadyRating,
          },
        },
        {
          $set: {
            "ratings.$.start": start,
            "ratings.$.comment": comment, 
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
            ratings: {
              start,
              comment,
              postBy: id,
            },
          },
        },
        { new: true }
      );
    }
    const allRatings = await Product.findById(productId);
    const totalRatings = Number(allRatings?.ratings?.length);
    const ratingsSum = Number(
      allRatings?.ratings.map((r) => r.start).reduce((prev, curr) => prev + curr, 0)
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
    CustomError(res, err, "add or updated rating");
  }
});
