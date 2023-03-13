import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import { validateMongo } from "../../utils/validateMongo";
import Buy from "../../models/buy";
////////////////////////////////////////////////////////////////////////////////////////////
export const updatedOrderStatus = asyncHandler(async (req: RequestType, res: Response) => {
  //---------------------------------------------------------------------------------------
  const { status } = req.body;
  const { id } = req.user;
  //---------------------
  try {
    validateMongo(id);
    //-----------------------------------------------------
    const updatedOrderStatus = await Buy.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status,
        },
      },
      { new: true }
    );
    //------------------
    res.json({
      status: "success",
      updatedOrderStatus,
    });
    //---------------------------------
  } catch (err) {
    CustomError(res, err, "All orders");
  }
});
