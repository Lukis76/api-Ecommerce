import { model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IBlog {
  title: string;
  description: string;
  category: string;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: Array<IUser | string>;
  dislikes: Array<IUser | string>;
  images: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogschema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    images: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export default model<IBlog>("Blog", blogschema);
