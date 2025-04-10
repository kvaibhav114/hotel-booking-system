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

      await axios.post('http://localhost:5000/api/bookings', {
        roomType: room.roomType,       // Assuming roomType & roomNumber are needed in backend
        roomNumber: room.roomNumber,
        ...formData
      });

      setSuccessMsg('Booking successful!');
      setFormData({
        guestName: '',
        email: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
      });
    } catch (err) {
      setErrorMsg('Booking failed. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
        <p className="mb-4">{room.description}</p>
        <p className="mb-4 font-medium">₹{room.price} / night</p>

        <div className="space-y-2">
          <input
            type="text"
            name="guestName"
            placeholder="Your Name"
            value={formData.guestName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleBooking}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>

          {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
        </div>

        <button
          className="mt-4 text-gray-600 underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
