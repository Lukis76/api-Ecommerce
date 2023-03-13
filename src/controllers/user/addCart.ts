import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomError } from "../../utils/err";
import { RequestType } from "../../middlewares";
import User from "../../models/user";
import Cart from "../../models/cart";
import Product from "../../models/product";
import { validateMongo } from "../../utils/validateMongo";
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const addCart = asyncHandler(async (req: RequestType, res: Response) => {
  const { cart } = req.body;
  const { id } = req.user;
  try {
    validateMongo(id);

    let products = [];

    const user = await User.findById(id);

    const existCart = await Cart.findOne({ ordeyBy: user?.id });

    if (existCart) existCart;

    for (let i = 0; i < cart.length; i++) {
      const getPrice = await Product.findById(cart[i].id).select("price").exec();

      products.push({
        product: cart[i].id,
        count: cart[i].count,
        color: cart[i].color,
        price: getPrice?.price || 0,
      });
    }

    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user?.id,
    }).save();

    res.json({
      status: "success",
      products,
      newCart,
      cartTotal,
    });
  } catch (err) {
    CustomError(res, err, "Add cart");
  }
});
