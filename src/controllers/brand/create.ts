
import Band from "../../models/band";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomError } from "../../utils/err";

export const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newBand = await Band.create(req.body);
    if (!newBand) throw new Error("Created new band failed");
    res.json({
      status: "success",
      newBand,
    });
  } catch (err) {
    CustomError(res, err, "Created band");
  }
});
