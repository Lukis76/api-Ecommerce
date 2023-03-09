import Category from "../../models/category";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError } from "../../utils/err";

export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json({
      status: "success",
      newCategory,
    });
  } catch (err) {
    throw CError(err, "Created category");
  }
});
