import React, { useState } from 'react';
import axios from 'axios';

export default function RoomDetailsModal({ room, onClose }) {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      await axios.post('https://hotel-booking-system-backend-7zdf.onrender.com/api/bookings', {
        roomType: room.type,
        roomNumber: room.roomNumber,
        ...formData
      });

      setSuccessMsg('🎉 Booking successful!');
      setFormData({
        guestName: '',
        email: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
      });
    } catch (err) {
      setErrorMsg('❌ Booking failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-lg relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{room.type}</h2>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <p className="text-xl font-semibold text-blue-700 mb-6">₹{room.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Guest Name</label>
            <input
              type="text"
              name="guestName"
              placeholder="Your Name"
              value={formData.guestName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Check-In</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Check-Out</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full transition"
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>

          {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
        </div>

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
          title="Close"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
