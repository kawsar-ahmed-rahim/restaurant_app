import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/my-bookings");

      if (data?.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Bookings</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">
            No bookings yet. Book a table now!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.name}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <p>
                  <span className="font-medium">Phone:</span> {booking.phone}
                </p>

                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>

                <p>
                  <span className="font-medium">Time:</span> {booking.time}
                </p>

                <p>
                  <span className="font-medium">Guests:</span>{" "}
                  {booking.numberOfPeople}
                </p>
              </div>

              {booking.note && (
                <div className="mt-3 text-gray-700">
                  <span className="font-medium">Note:</span> {booking.note}
                </div>
              )}

              <div className="mt-3 text-gray-500 text-sm">
                Booked on:{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
