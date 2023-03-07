import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CError } from "../../utils/err";

export const allProducts = asyncHandler(async (req: Request, res: Response) => {
  const queryObj = { ...req.query };
  const exclude = ["page", "sort", "limit", "fields"];
  exclude.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Product.find(JSON.parse(queryStr));

  //-- Sorting --
  if (req.query?.sort) {
    const sortBy = req.query.sort.toString().split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createAt");
  }

  //-- Limiting --
  if (req.query?.fields) {
    const fields = req.query.fields.toString().split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  //-- Pagination --
  if (req.query?.page && req.query?.limit) {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    const productCount = await Product.countDocuments();
    if (skip >= productCount) throw new Error("This page does not exists");
  }

  try {
    const products = await query;
    res.json(products);
  } catch (err) {
    throw CError(err, "created product");
  }
});
