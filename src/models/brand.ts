import { Schema, model } from "mongoose";

interface IBrand {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IBrand>("Brand", brandSchema);
