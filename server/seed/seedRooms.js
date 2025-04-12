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
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
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
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg'
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
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      'https://images.pexels.com/photos/1449209/pexels-photo-1449209.jpeg'
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
