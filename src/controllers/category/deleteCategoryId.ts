import Category from "../../models/category";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { validateMongo } from "../../utils/validateMongo";
import { CError, CustomError } from "../../utils/err";

export const deleteCategoryId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id)
    const deleteCategory = await Category.findByIdAndDelete(id);
    if(!deleteCategory) throw new Error("Deleted category and find by id failed")
    res.json({
      status: "success",
      deleteCategory,
    });
  } catch (err) {
    CustomError(res, err, "Delete category");
  }
});
