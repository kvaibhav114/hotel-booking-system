import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={handleLogin} />;
}
