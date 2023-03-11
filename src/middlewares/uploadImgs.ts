import multer, { FileFilterCallback, Multer } from "multer";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (_req, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, file.filename + "-" + uniqueName + ".jpeg");
  },
});

const multerFilter = (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2_000_000 },
});

export const productImgResize = async (req: Express.Request, _res: Response, next: NextFunction) => {
  if (!req.files || !req.file) return next();

  if (Array.isArray(req.files)) {
    await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 70 })
          .toFile(`public/images/products/${file.filename}`);
      })
    );
  } else {
    await sharp(req.file?.path)
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 70 })
      .toFile(`public/images/products/${req.file?.filename}`);
  }
};




export const blogImgResize = async (req: Express.Request, _res: Response, next: NextFunction) => {
  if (!req.files || !req.file) return next();

  if (Array.isArray(req.files)) {
    await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 70 })
          .toFile(`public/images/blogs/${file.filename}`);
      })
    );
  } else {
    await sharp(req.file?.path)
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 70 })
      .toFile(`public/images/blogs/${req.file?.filename}`);
  }
};











