
import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
///////////////////////////////////////////////////////////////////////////
export const deleteProductId = asyncHandler(async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    //-----------------------------------------------
    const deleteProduct = await Product.findOneAndDelete({id});
    //-----------------------------------------------
    res.json(deleteProduct);
  } catch (err) {
    throw new Error(err?.toString() || "Error inesperado");
  }
});
