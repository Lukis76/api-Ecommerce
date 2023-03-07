
import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CError } from "../../utils/err";
/////////////////////////////////////////////////////////////////////////////////////
export const deleteProductId = asyncHandler(async (req: Request, res: Response) => {
  //--------------------------------------------------------------------------------
  const {id} = req.params
  //---------------------
  try {
    //---------------------------------------------------------
    const deleteProduct = await Product.findOneAndDelete({id});
    //---------------------------------------------------------
    res.json(deleteProduct);
  } catch (err) {
    throw CError(err, "deleted product");
  }
});
