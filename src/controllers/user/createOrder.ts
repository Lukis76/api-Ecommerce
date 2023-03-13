import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import Cart, { ICart, ICartProduct } from "../../models/cart";
import User from "../../models/user";
import Coupon from "../../models/coupon";
import { validateMongo } from "../../utils/validateMongo";
import Buy, { ORDER_STATUS } from "../../models/buy";
import Product from "../../models/product";
/////////////////////////////////////////////////////////////////////////////////////
export const createOrder = asyncHandler(async (req: RequestType, res: Response) => {
  const { code, coupon } = req.body;
  const { id } = req.user;

  try {
    validateMongo(id);

    if (!code) throw new Error("create cash order failed");

    const userCart: ICart | null = await Cart.findOne({ orderBy: id })
      .populate("products.product")
      .exec();

    if (!userCart) throw new Error("search acrt order by failed");

    let finatAmount = 0;

    if (coupon && userCart?.totalAfterDiscount) {
      finatAmount = userCart.totalAfterDiscount;
    } else {
      finatAmount = userCart.cartTotal;
    }

    const nowDate = Date.now();

    let newOrder = await new Buy({
      products: userCart?.products,
      paymentIntent: {
        id: `${nowDate}${nowDate.toString(36)}${nowDate.toString(26)}`,
        method: "COD",
        amount: finatAmount,
        status: ORDER_STATUS.CASH_ON_DELIVERY,
        createdAt: Date.now(),
        currency: "USD",
      },
      orderBy: id,
      orderStatus: ORDER_STATUS.CASH_ON_DELIVERY,
    }).save();

    if (!userCart.products.length) throw new Error("List products 0");

    let update = userCart?.products?.map((item) => {
      return {
        updateOne: {
          filter: {
            //@ts-ignore
            id: item?.product.id,
          },
          update: {
            //@ts-ignore
            $inc: { quality: -item?.count },
          },
        },
      };
    });

    let updated = await Product.bulkWrite(update, {});

    res.json({
      status: "success",
    });
  } catch (err) {
    CustomError(res, err, "CreateOrder");
  }
});
