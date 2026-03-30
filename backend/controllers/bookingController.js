import Booking from "../models/bookingModel";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, numberOfPeople, date, time, note } = req.body;
    if (!name || !phone || !numberOfPeople || !date || !time) {
      return res.json({
        success: false,
        message: "All fields are required",
        success: false,
      });
    }
    // check for overlapping bookings
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "cancelled" },
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ success: false, message: " This time slot is already booked" });
    }
    const booking = await Booking.create({
      user: id,
      name,
      phone,
      numberOfPeople,
      date,
      time,
      note,
    });
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to create booking" });
  }
};

// get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// update booking status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};
