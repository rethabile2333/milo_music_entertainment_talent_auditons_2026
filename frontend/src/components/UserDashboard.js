import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {

      const token = localStorage.getItem("token");

const res = await api.get("/user/profile", {
    headers:{
        Authorization:`Bearer ${token}`
    }
});

      console.log(res.data);

      setProfile(res.data.profile);

    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  fetchData();
}, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo-area">
          <img
            src="/logo.jpeg"
            alt="Talent Auditions Logo"
            className="logo"
          />
          <h1 className="site-title">Talent Auditions</h1>
        </div>

        <nav className="nav">
          <a href="/profilepage">My Profile</a>
          <a href="/results">Results</a>
          <a href="/feedback">Feedback</a>
        

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome, {profile?.full_name}</h2>
        <p>We wish you all the best in your Talent Audition.</p>
      </div>

      {/* Upcoming Audition */}
      <section className="audition-card">
        <h2>📅 Upcoming Audition</h2>

        <div className="audition-info">
          <div className="info-row">
            <span>Date</span>
            <strong>08 August 2026</strong>
          </div>

          <div className="info-row">
            <span>Time</span>
            <strong>09:00 AM</strong>
          </div>

          <div className="info-row">
            <span>Reporting Time</span>
            <strong>08:30 AM</strong>
          </div>

          <div className="info-row">
            <span>Venue</span>
            <strong>Global Guest House, Maseru</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <strong className="scheduled">Scheduled</strong>
          </div>
        </div>
      </section>
    </div>
  );
}


