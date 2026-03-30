import express from "express";

import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
const bookingRoutes = express.Router();

bookingRoutes.post("/create", protect, createBooking);
bookingRoutes.get("/my-bookings", protect, getUserBookings);
bookingRoutes.get("/bookings", protect, adminOnly, getAllBookings);
bookingRoutes.put(
  "/update-status/:bookingId",
  protect,
  adminOnly,
  updateBookingStatus,
);

export default bookingRoutes;
