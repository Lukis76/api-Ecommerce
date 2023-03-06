import { sign } from "jsonwebtoken";

export const refreshToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};
