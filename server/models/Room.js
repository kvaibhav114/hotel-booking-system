const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: String,
  description: String,
  price: Number,
  maxPeople: Number,
  images: [String],
  amenities: [String],
  roomNumbers: [
    {
      number: Number,
      unavailableDates: [Date]
    }
  ]
});

module.exports = mongoose.model('Room', roomSchema);
