import { Link } from "react-router-dom";

export default function App() {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg')",
      }}
    >
      {/* Soft blur overlay */}
      <div className="absolute inset-0 backdrop-blur-xs"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
          Hotel Hillock
        </h1>
        <p className="text-2xl mb-8 drop-shadow-md">
          Room Booking Portal
        </p>
        <Link
          to="/rooms"
          className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition shadow-lg"
        >
          Book Rooms
        </Link>
      </div>
    </div>
  );
}
