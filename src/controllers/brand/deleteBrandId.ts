import Brand from "../../models/brand";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CustomError } from "../../utils/err";

export const deleteBrandId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id);
    const deleteBrand = await Brand.findByIdAndDelete(id);
    if (!deleteBrand) throw new Error("Deleted brand and find by id failed");
    res.json({
      status: "success",
      deleteBrand,
    });
  } catch (err) {
    CustomError(res, err, "Delete Brand");
  }
});
