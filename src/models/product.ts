import { Schema, model, Document } from "mongoose";

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
  postBy: string;
}

const productSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    band: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
      select: false,
    },
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
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
