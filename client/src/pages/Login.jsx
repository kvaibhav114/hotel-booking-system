import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hotel-booking-system-backend-7zdf.onrender.com/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 100);

    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div>
          <label className="block mb-2 text-gray-300">Username</label>
          <input
            type="text"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Password</label>
          <input
            type="password"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold w-full py-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
