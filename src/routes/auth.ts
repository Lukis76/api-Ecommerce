import { Router } from "express";
import {
  block,
  login,
  logOut,
  userId,
  getCart,
  unBlock,
  address,
  addCart, 
  allUsers,
  register,
  getOrder,
  deleteCart,
  getwishList,
  applyCoupon,
  createOrder,
  resetPassword,
  updatePassword,
  forgotPassToken,
  handleRefreshToken,
  updatedOrderStatus,
} from "../controllers/user";
import { isAdmin, auth } from "../middlewares";

const router = Router();

router.post("/resgister", register);
router.post("/forgotpasswordtoken", forgotPassToken);
router.post("/login", login);
router.post("/cart", auth, addCart);
router.post("/cart/applycoupon", auth, applyCoupon);
router.post("/order", auth, createOrder);
router.put("/order/:id", auth, isAdmin, updatedOrderStatus);
router.put("/resetpasswordtoken/:token", resetPassword);
router.put("/password", auth, updatePassword);
router.put("/edit", auth, userId);
router.put("/address", auth, address);
router.put("/block/:id", auth, isAdmin, block);
router.put("/unblock/:id", auth, isAdmin, unBlock);
router.get("/cart/order", auth, getOrder);
router.get("/cart", auth, getCart);
router.get("/allusers", allUsers);
router.get("/refreshToken", handleRefreshToken);
router.get("/logout", logOut);
router.get("/wishlist", auth, getwishList);
router.get("/:id", auth, isAdmin, userId);
router.delete("/cart", auth, deleteCart);
router.delete("/:id", userId);

export default router;
