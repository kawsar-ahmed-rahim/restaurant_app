import express from "express";

import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./../controllers/categoryController.js";
const categoryRoutes = express.Router();

categoryRoutes.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"),
  addCategory,
);
categoryRoutes.get("/all", getAllCategories);

categoryRoutes.put(
  "/update/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateCategory,
);
categoryRoutes.delete(
  "/delete/:id",
  protect,
  adminOnly,
  upload.single("image"),
  deleteCategory,
);

export default categoryRoutes;
