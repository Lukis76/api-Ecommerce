import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectdb } from "./config/dbConnect";
import auth from "./routes/auth";
import product from "./routes/product";
import blog from "./routes/blog";
import { errorHandler, notFound } from "./middlewares/error";
const app = express();

const main = async () => {
  // variables de entorno
  dotenv.config();
  const PORT = process.env.PORT || 4000;
  await connectdb();

  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.options("*", cors());
  // app.use("/", (_req, res) => {
  //   res.send("Hello from send!!!");
  // })

  app.use("/api/user", auth);
  app.use("/api/product", product);
  app.use("/api/blog", blog);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`server on port ==> ${PORT}`);
  });
};

main();
