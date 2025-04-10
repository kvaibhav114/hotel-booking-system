const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guestName: String,
  email: String,
  phone: String,
  roomType: String,
  roomNumber: Number,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
