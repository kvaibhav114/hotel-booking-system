import React, { useState } from 'react';
import RoomDetailsModal from './RoomDetailsModal';

const RoomCard = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="rounded-2xl shadow-md hover:shadow-xl transition duration-300 bg-white border overflow-hidden flex flex-col justify-between">
      {/* Room Image */}
      <div className="h-56 w-full overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.type}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🛏️ {room.type}</h2>
          <p className="text-gray-600 text-sm mb-3">
            🧾 {room.description?.slice(0, 100) || "No description available"}...
          </p>

          <div className="text-blue-700 font-semibold text-lg mb-1">
            💰 ₹{room.price} <span className="text-sm font-normal text-gray-500">/ night</span>
          </div>

          <p className="text-sm text-gray-500">👥 Max Guests: {room.maxPeople}</p>
        </div>

        {/* Button */}
        <button 
          onClick={openModal}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <RoomDetailsModal room={room} onClose={closeModal} />}
    </div>
  );
};

export default RoomCard;
