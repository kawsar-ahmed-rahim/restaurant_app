import express from "express";

import { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItem,
  updateMenuItem,
} from "./../controllers/menuController.js";
const menuRoutes = express.Router();

menuRoutes.post("/add", adminOnly, upload.single("image"), addMenuItem);
menuRoutes.get("/all", getAllMenuItem);

menuRoutes.put(
  "/update/:id",
  adminOnly,
  upload.single("image"),
  updateMenuItem,
);
menuRoutes.delete(
  "/delete/:id",
  adminOnly,
  upload.single("image"),
  deleteMenuItem,
);

export default menuRoutes;
