import Brand from "../../models/brand";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";

export const allBrand = asyncHandler(async (req: Request, res: Response) => {
  try {
    const allBrand = await Brand.find();
    if (!allBrand) throw new Error("Get find all brand failed");
    res.json({
      status: "success",
      allBrand,
    });
  } catch (err) {
    CustomError(res, err, "Get all brand");
  }
});






