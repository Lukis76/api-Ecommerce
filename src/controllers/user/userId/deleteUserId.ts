import User from "../../../models/user"
import {Response} from "express"
import { validateMongo } from "../../../utils/validateMongo"
/////////////////////////////////////////
export const deleteUserId = async (id: string, res: Response ) => {
  validateMongo(id)
  const deleteUser =  await User.findByIdAndDelete(id)
  res.json(deleteUser)
}
