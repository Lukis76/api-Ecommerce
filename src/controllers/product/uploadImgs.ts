import Product from "../../models/product";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";
import { validateMongo } from "../../utils/validateMongo";
import { uploadImg } from "../../utils/cloudinary";
import { unlinkSync } from "fs";
////////////////////////////////////////////////////////////////////////////////
export const uploadImgs = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateMongo(id);
    //---------------
    const urls = [];
    //-----------------------------------------------
    const files = req.files as Express.Multer.File[];
    //-----------------------------------------------
    for (const file of files) {
      const { path } = file;
      const newPath = await uploadImg(path);
      urls.push(newPath);
      unlinkSync(path);
    }
    //--------------------------------------------------
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((url) => url),
      },
      { new: true }
    );
    //---------------------------
    res.json({
      status: "success",
      findProduct,
    });
  } catch (err) {
    CustomError(res, err, "Upload image/s");
  }
});
