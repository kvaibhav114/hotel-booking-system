import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this booking?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  const handleEdit = (booking) => {
    setEditingId(booking._id);
    setEditData(booking);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${editingId}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(bookings.map((b) => (b._id === editingId ? res.data : b)));
      setEditingId(null);
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Bookings Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Room</th>
            <th className="p-2">Check-In</th>
            <th className="p-2">Check-Out</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t">
              <td className="p-2">
                {editingId === booking._id ? (
                  <input
                    value={editData.guestName}
                    onChange={(e) =>
                      setEditData({ ...editData, guestName: e.target.value })
                    }
                    className="border p-1 w-full"
                  />
                ) : (
                  booking.guestName
                )}
              </td>
              <td className="p-2">{booking.email}</td>
              <td className="p-2">{booking.roomType}</td>
              <td className="p-2">
                {new Date(booking.checkIn).toLocaleDateString()}
              </td>
              <td className="p-2">
                {new Date(booking.checkOut).toLocaleDateString()}
              </td>
              <td className="p-2 space-x-2">
                {editingId === booking._id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(booking)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
