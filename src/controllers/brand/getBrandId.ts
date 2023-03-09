import Brand from "../../models/brand";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CustomError } from "../../utils/err";

export const getBrandId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id);
    const getBrand = await Brand.findById(id);
    if (!getBrand) throw new Error("Get brand and find by id failed");
    res.json({
      status: "success",
      getBrand,
    });
  } catch (err) {
    CustomError(res, err, "Get brand");
  }
});
