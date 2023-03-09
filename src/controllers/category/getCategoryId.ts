import Category from "../../models/category";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CustomError } from "../../utils/err";

export const getCategoryId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id);
    const getCategory = await Category.findById(id);
    if (!getCategory) throw new Error("Get category and find by id failed");
    res.json({
      status: "success",
      getCategory,
    });
  } catch (err) {
    CustomError(res, err, "Get category");
  }
});
