import mongoose from "mongoose";

export const connectdb = async () => {
  await mongoose
    .connect(process.env.DATA_BASE as string)
    .then((db) => console.log(`DB is connected to ${db.connection.host}`))
    .catch((err) => console.error(err));
};
