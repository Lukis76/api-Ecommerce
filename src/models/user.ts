import { Schema, model, Types, Document, ObjectId } from "mongoose";
import { genSaltSync, hash, compare } from "bcrypt";
import { IProduct } from "./product";
import crypto from 'crypto'


export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  password: string;
  role: string;
  cart: Array<IProduct>;
  isBlocked: boolean;
  address: Array<ObjectId>;
  wishlist: Array<ObjectId>;
  refreshToken?: string;
  passwordChangeAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    mobile: {
      type: Number,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: [{ type: Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = genSaltSync(10);
  this.password = await hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resetToken;
};

export default model<IUser>("User", userSchema);
