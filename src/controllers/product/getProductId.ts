
import Product from "../../models/product"
import asyncHandler from "express-async-handler"
import {Request, Response } from "express"
import { CError } from "../../utils/err"

export const getProductId = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
  try {
    const findProduct = await Product.findById(id) 
    res.json(findProduct)
  } catch (err) {
    throw CError(err, "Get product");
  }

})








