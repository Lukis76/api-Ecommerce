import { Schema, model, Document } from "mongoose";

interface ICoupon extends Document {
  name: string;
  expired: Date;
  discount: number;
}

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expired: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

export default model<ICoupon>("Coupon", couponSchema);
