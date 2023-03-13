import { Schema, model, Types } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICart {
  products: Array<ICartProduct | string>;
  cartTotal: number;
  totalAfterDiscount: number;
  orderBy: IUser | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartProduct {
  product: IProduct | string;
  count: number;
  color: string;
  price: number;
}

const cartSchema = new Schema(
  {
    products: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        count: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    cartTotal: {
      type: Number,
      default: 0,
    },
    totalAfterDiscount: {
      type: Number,
      default: 0,
    },
    orderBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model<ICart>("Cart", cartSchema);
