import User from "../../../models/user"
import {Response} from "express"
import { RequestType } from "../../../middlewares/auth"
import { validateMongo } from "../../../utils/validateMongo"
/////////////////////////////////////////
export const getUserId = async (req: RequestType, res: Response ) => {
  const { id } = req.user
  validateMongo(id)
  const getUser =  await User.findById(id)
  res.json(getUser)
}
