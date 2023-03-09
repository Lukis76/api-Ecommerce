import Category from "../../models/category";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";

export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    if (!newCategory) throw new Error("Created new category failed");
    res.json({
      status: "success",
      newCategory,
    });
  } catch (err) {
    CustomError(res, err, "Created category");
  }
});
