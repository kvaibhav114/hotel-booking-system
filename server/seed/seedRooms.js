const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('../models/Room');

dotenv.config();

const rooms = [
  {
    type: 'Deluxe Room',
    description: 'A spacious room with a king-sized bed, balcony, and modern bathroom.',
    price: 3000,
    maxPeople: 2,
    images: [
      'https://example.com/deluxe1.jpg',
      'https://example.com/deluxe2.jpg'
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Room Service'],
    roomNumbers: [
      { number: 101, unavailableDates: [] },
      { number: 102, unavailableDates: [] }
    ]
  },
  {
    type: 'Suite',
    description: 'Premium suite with living area, large bathroom, and luxury decor.',
    price: 5000,
    maxPeople: 4,
    images: [
      'https://example.com/suite1.jpg',
      'https://example.com/suite2.jpg'
    ],
    amenities: ['WiFi', 'Jacuzzi', 'Mini Bar', 'Air Conditioning'],
    roomNumbers: [
      { number: 201, unavailableDates: [] },
      { number: 202, unavailableDates: [] }
    ]
  },
  {
    type: 'Standard Room',
    description: 'A comfortable room with all basic amenities for a pleasant stay.',
    price: 2000,
    maxPeople: 2,
    images: [
      'https://example.com/standard1.jpg',
      'https://example.com/standard2.jpg'
    ],
    amenities: ['WiFi', 'Television', 'Daily Housekeeping'],
    roomNumbers: [
      { number: 301, unavailableDates: [] },
      { number: 302, unavailableDates: [] }
    ]
  }
];


const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Room.deleteMany();
    await Room.insertMany(rooms);
    console.log('Room data seeded');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

seedRooms();
