import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CError } from "../../utils/err";
///////////////////////////////////////////////////////////////////////////
export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    //--------------------------------------
    const { title, description } = req.body;
    //----------------------------------------------------------------
    const normalize = (str: string): string => str.toString().trim().replace(/\s+/g, " ");
    //----------------------------------------------------------------
    const slugTitle: string = title.toString().trim().replace(/\s+/g, "-").toLowerCase();
    //----------------------------------------------------------------
    req.body.slug = slugTitle;
    req.body.title = normalize(title);
    req.body.description = normalize(description);
    //-------------------------------------------------
    const product = req.body;
    //-----------------------------------------------
    const newProduct = await Product.create(product);
    //-----------------------------------------------
    res.json({ newProduct });
  } catch (err) {
    throw CError(err, "created product");
  }
});
