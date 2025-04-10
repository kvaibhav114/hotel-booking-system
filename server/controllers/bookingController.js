const Booking = require('../models/Booking');

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { roomId, guestName, email, checkIn, checkOut, guests } = req.body;

    const booking = new Booking({
      room: roomId,
      guestName,
      email,
      checkIn,
      checkOut,
      guests,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found" });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { createBooking, getAllBookings, deleteBooking, updateBooking };
