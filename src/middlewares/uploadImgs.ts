import multer, { FileFilterCallback, diskStorage } from "multer";
import { Response, NextFunction } from "express";
import sharp from "sharp";
import path from "path";
import { unlinkSync } from "fs";
///////////////////////////////////////////
const multerStorage = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/"));
  },
  filename: (_req, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, file.fieldname + "-" + uniqueName + ".png");
  },
});
////////////////////////////////////////////////////////////////////////////////////////////////////

const multerFilter = (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
/////////////////////////////////////

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 5_000_000 },
}).array("image", 10);
//////////////////////////////////////////////////////////////////////////////////////////

export const productImgResize = async (req: any, _res: Response, next: NextFunction) => {
  if (!req.files || !req.file) return next();

  if (Array.isArray(req.files)) {
    await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("png")
          .png({ quality: 70 })
          .toFile(`public/images/product/${file.filename}`);
        unlinkSync(`public/images/product/${file.filename}`);
      })
    );
  } else {
    await sharp(req.file?.path)
      .resize(300, 300)
      .toFormat("png")
      .png({ quality: 70 })
      .toFile(`public/images/product/${req.file?.filename}`);
    unlinkSync(`public/images/product/${req.file?.filename}`);
  }
  // unlinkSync(`public/images/products/${req.file?.filename}`)
  next();
};
///////////////////////////////////////////////////////////////////////////////////////////////////

export const blogImgResize = async (req: Express.Request, _res: Response, next: NextFunction) => {
  if (!req.files || !req.file) return next();

  if (Array.isArray(req.files)) {
    await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("png")
          .png({ quality: 70 })
          .toFile(`public/images/blog/${file.filename}`);
        unlinkSync(`public/images/blog/${file.filename}`);
      })
    );
  } else {
    await sharp(req.file?.path)
      .resize(300, 300)
      .toFormat("png")
      .png({ quality: 70 })
      .toFile(`public/images/blog/${req.file?.filename}`);
    unlinkSync(`public/images/blog/${req.file?.filename}`);
  }
  // unlinkSync(`public/images/blogs/${req.file?.filename}`)
  next();
};
