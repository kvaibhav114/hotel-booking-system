import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useInactivityLogout(timeout = 120000) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("token");
        alert("Logged out due to inactivity.");
        navigate("/login");
      }, timeout);
    };

    // Attach listeners to reset timer on any user activity
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start timer initially
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout]);
}
