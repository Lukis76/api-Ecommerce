import { v2 as cloudinary } from "cloudinary";
import { resolve } from "path";
////////////////////////////////////
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//////////////////////////////////////////////////////////////////
// /
// export const useCloudUpload = async (fileToUploads) => {
//   return new Promise(
//     (resolve) => {
//       cloudinary.uploader.upload(fileToUploads, (result) => {
//         resolve(
//           {
//             url: result.secure_url,
//           },
//           {
//             resource_type: "auto",
//           }
//         )
//       })
//     }
//   )
// }

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });

export const uploadImg = async (file: string) => {
  const res = await cloudinary.uploader.upload(file, { public_id: "ecommerce/products" });

  return res.data;
};
