import { Router } from "express";
import {
  block,
  login,
  logOut,
  userId,
  unBlock,
  allUsers,
  register,
  resetPassword,
  updatePassword,
  forgotPassToken,
  handleRefreshToken,
} from "../controllers/user";
import { isAdmin, auth } from "../middlewares";

const router = Router();

router.post("/resgister", register);
router.post("/forgotpasswordtoken", forgotPassToken);
router.put("/resetpasswordtoken/:token", resetPassword);
router.put("/password", auth, updatePassword);
router.post("/login", login);
router.get("/allusers", allUsers);
router.get("/refreshToken", handleRefreshToken);
router.get("/logout", logOut);
router.get("/:id", auth, isAdmin, userId);
router.delete("/:id", userId);
router.put("/edit", auth, userId);
router.put("/block/:id", auth, isAdmin, block);
router.put("/unblock/:id", auth, isAdmin, unBlock);

export default router;
