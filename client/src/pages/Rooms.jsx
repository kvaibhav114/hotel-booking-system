import { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("https://hotel-booking-system-backend-7zdf.onrender.com/api/rooms")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          Available Rooms
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
