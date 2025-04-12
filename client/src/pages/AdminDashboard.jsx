import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInactivityLogout from "../hooks/useInactivityLogout";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  useInactivityLogout(120000); // 2 minutes

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://hotel-booking-system-backend-7zdf.onrender.com/api/bookings", {
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
      await axios.delete(`https://hotel-booking-system-backend-7zdf.onrender.com/api/bookings/${id}`, {
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
    setEditData({ ...booking });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://https://hotel-booking-system-backend-7zdf.onrender.com/bookings/${editingId}`,
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Bookings Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Check-In</th>
              <th className="p-3">Check-Out</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t border-gray-700">
                <td className="p-3">
                  {editingId === booking._id ? (
                    <input
                      value={editData.guestName}
                      onChange={(e) =>
                        setEditData({ ...editData, guestName: e.target.value })
                      }
                      className="bg-gray-800 text-white border border-gray-600 rounded p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    booking.guestName
                  )}
                </td>
                <td className="p-3">
                  {editingId === booking._id ? (
                    <input
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="bg-gray-800 text-white border border-gray-600 rounded p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    booking.email
                  )}
                </td>
                <td className="p-3">
                  {editingId === booking._id ? (
                    <input
                      type="date"
                      value={new Date(editData.checkIn).toLocaleDateString("en-CA")}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          checkIn: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white border border-gray-600 rounded p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    new Date(booking.checkIn).toLocaleDateString()
                  )}
                </td>
                <td className="p-3">
                  {editingId === booking._id ? (
                    <input
                      type="date"
                      value={new Date(editData.checkOut).toLocaleDateString("en-CA")}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          checkOut: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white border border-gray-600 rounded p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    new Date(booking.checkOut).toLocaleDateString()
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editingId === booking._id ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(booking)}
                      className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
