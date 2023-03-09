import Brand from "../../models/brand";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";

export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newBrand = await Brand.create(req.body);
    if (!newBrand) throw new Error("Created new brand failed");
    res.json({
      status: "success",
      newBrand,
    });
  } catch (err) {
    CustomError(res, err, "Created brand");
  }
});
