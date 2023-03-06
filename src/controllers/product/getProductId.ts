
import Product from "../../models/product"
import asyncHandler from "express-async-handler"
import {Request, Response } from "express"

export const getProductId = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
  try {
    const findProduct = await Product.findById(id) 
    res.json(findProduct)
  } catch (err) {
    throw new Error(err?.toString() || "Error inesperado");
  }

})








