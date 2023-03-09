import Category from "../../models/category";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError, CustomError } from "../../utils/err";

export const putCategoryId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id);
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    console.log("update category faind => ", updateCategory);
    if (!updateCategory) throw new Error("Updated category and find by id failed");
    res.json({
      status: "success",
      updateCategory,
    });
  } catch (err) {
    CustomError(res, err, "Updated category");
  }
});
