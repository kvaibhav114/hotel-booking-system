import { Link } from "react-router-dom";

export default function App() {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Hotel Hillock</h1>
        <p className="text-xl mb-6">Room Booking Portal</p>
        <Link
          to="/rooms"
          className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          Book Rooms
        </Link>
      </div>
    </div>
  );
}
