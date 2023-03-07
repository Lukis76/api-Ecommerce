import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CError } from "../../utils/err";
///////////////////////////////////////////////////////////////////////////
export const putProductId = asyncHandler(async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    //--------------------------------------
    const { title, description } = req.body;
    //----------------------------------------------------------------
    const normalize = (str: string) => str.trim().replace(/\s+/g, " ")
    //----------------------------------------------------------------
    const slugTitle = title.trim().replace(/\s+/g, "-").toLowerCase();
    //----------------------------------------------------------------
    req.body.slug = slugTitle;
    req.body.title = normalize(title);
    req.body.description = normalize(description)
    //-------------------------------------------------
    const product = req.body;
    //-----------------------------------------------
    const updateProduct = await Product.findByIdAndUpdate({id}, product, {new: true});
    //-----------------------------------------------
    res.json(updateProduct);
  } catch (err) {
    throw CError(err, "Updated product");
  }
});
