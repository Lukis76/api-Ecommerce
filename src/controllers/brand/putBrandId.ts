import Brand from "../../models/brand";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CustomError } from "../../utils/err";

export const putBrandId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id);
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateBrand) throw new Error("Updated brand and find by id failed");
    res.json({
      status: "success",
      updateBrand,
    });
  } catch (err) {
    CustomError(res, err, "Updated brand");
  }
});

