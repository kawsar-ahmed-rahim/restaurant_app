import express from "express";

import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItem,
  updateMenuItem,
} from "./../controllers/menuController.js";
const menuRoutes = express.Router();

menuRoutes.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"),
  addMenuItem,
);
menuRoutes.get("/all", getAllMenuItem);

menuRoutes.put(
  "/update/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateMenuItem,
);
menuRoutes.delete(
  "/delete/:id",
  protect,
  adminOnly,
  upload.single("image"),
  deleteMenuItem,
);

export default menuRoutes;
