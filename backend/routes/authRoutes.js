import express from "express";
import {
  adminLogin,
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
  isAuth,
  adminAuth,
} from "../controllers/authController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);

authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/is-auth", protect, isAuth);

authRoutes.get("/admin-auth", protect, adminOnly, adminAuth);

export default authRoutes;
