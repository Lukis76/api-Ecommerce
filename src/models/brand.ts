import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Brand", brandSchema);
