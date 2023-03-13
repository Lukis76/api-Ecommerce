import { v2 as cloudinary } from "cloudinary";
////////////////////////////////////
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dpcrjjxuu",
  api_key: process.env.CLOUD_API_KEY || "227124691177684",
  api_secret: process.env.CLOUD_API_SECRET || "bWfTGVdElG2JXt_HtTsmEYazzMs",
  secure: true,
});
//////////////////////////////////////////////////////////////////

export const uploadImg = async (file: string) => {
  //-----------------------------------------------------------------------------
  const result = await cloudinary.uploader.upload(file, { folder: "ecommerce" });
  //-----------------------------------------------------------------------------
  return result.url;
  //----------------
};
