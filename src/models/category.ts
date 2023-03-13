import { Schema, model } from "mongoose";

interface ICategory {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
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

export default model<ICategory>("Category", categorySchema);
