
import Category from "../../models/category";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CError, CustomError } from "../../utils/err";

export const allCategory = asyncHandler(async (req: Request, res: Response) => {
  try {
    const allCategory = await Category.find();
    if (!allCategory) throw new Error("Get find all category failed");
    res.json({
      status: "success",
      allCategory,
    });
  } catch (err) {
    CustomError(res, err, "Get all category");
  }
});
