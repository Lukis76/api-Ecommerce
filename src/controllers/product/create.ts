import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
///////////////////////////////////////////////////////////////////////////
export const create = asyncHandler(async (req: Request, res: Response) => {
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
    const newProduct = await Product.create(product);
    //-----------------------------------------------
    res.json({ newProduct });
  } catch (err) {
    throw new Error(err?.toString() || "Error inesperado");
  }
});
