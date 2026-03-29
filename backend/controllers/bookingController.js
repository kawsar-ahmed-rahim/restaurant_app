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
    return res
      .status(201)
      .json({
        success: true,
        message: "Booking created successfully",
        booking,
      });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to create booking" });
  }
};
