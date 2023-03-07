import { Types } from "mongoose";
///////////////////////////////////////////////
export const validateMongo = (id: string) => {
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This id is not invalid or not Found");
  }
};
