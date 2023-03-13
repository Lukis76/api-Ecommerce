import { Schema, model, Types } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

interface IBuy {
  products: Array<IBuyProduct>;
  paymentIntent: Object;
  ordenStatus: ORDER_STATUS;
  orderBy: IUser | string
  createdAt: Date;
  updatedAt: Date;
}

interface IBuyProduct {
  product: IProduct | string;
  count: number;
  color: string;
}

export enum ORDER_STATUS {
  NOT_PROCESSED = "Not processed",
  CASH_ON_DELIVERY = "Cash on Delivery",
  PROCESSING = "Processing",
  DISPATCHED = "Dispatched",
  CANCELLED = "Cancelled",
  DELIVERED = "Delivered",
}

const buySchema = new Schema(
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
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model<IBuy>("Buy", buySchema);
