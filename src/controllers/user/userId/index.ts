import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { getUserId } from "./getUsetId";
import { deleteUserId } from "./deleteUserId";
import { putUserId } from "./putUserId";
////////////////////////////////////////////////////////////////////////////
export const userId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (req.method === "GET") {
      getUserId(req, res);
    } else if (req.method === "PUT") {
      putUserId(req, res);
    } else if (req.method === "DELETE") {
      deleteUserId(id, res);
    }
  } catch (err) {
    throw new Error(err?.toString() || "Error inesperado");
  }
});
