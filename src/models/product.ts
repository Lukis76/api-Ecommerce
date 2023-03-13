import { Schema, model, Document } from "mongoose";
import { IUser } from "./user";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  band: string;
  quantity: number;
  sold: number;
  images: Array<string>;
  color: string;
  ratings: Array<IRating>;
  totalRating: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IRating {
  start: number;
  comment: string;
  postBy: IUser | string;
}

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    band: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      select: false,
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    images: [],
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        start: { type: Number },
        comment: { type: String },
        postBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
