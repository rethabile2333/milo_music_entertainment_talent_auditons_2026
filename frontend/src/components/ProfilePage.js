import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./ProfilePage.css";

import EditProfileDrawer from "./EditProfileDrawer";
import ChangePasswordDrawer from "./ChangePasswordDrawer";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  // Drawer state
  const [drawer, setDrawer] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.profile);
      } catch (err) {
        console.error(
          "Profile Error:",
          err.response?.data || err.message
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="homepage">

      {/* Header */}

      <header className="header">
        <div className="logo-area">
          <img
            src="/logo.jpeg"
            alt="Milo Logo"
            className="logo"
          />
          <h1 className="site-title">
            Talent Auditions
          </h1>
        </div>

        <nav className="nav">
          <a href="/results">Results</a>
                    <a href="/feedback">Feedback</a>
          <Link to="/profilepage">My Profile</Link>
          <Link to="/login">Logout</Link>
        </nav>
      </header>

      {/* Profile */}

      {!profile ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          Loading...
        </p>
      ) : (
        <div className="profile-card">

          <div className="profile-cover"></div>

          <div className="profile-avatar">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-header">
            <h1>{profile.full_name}</h1>
            <p>{profile.email}</p>
          </div>

          <div className="profile-grid">

            <div className="info-card">

              <h3>Basic Information</h3>

              <div className="row">
                <span>Full Name</span>
                <strong>{profile.full_name}</strong>
              </div>

              <div className="row">
                <span>Email</span>
                <strong>{profile.email}</strong>
              </div>

              <div className="row">
                <span>Role</span>
                <strong>{profile.role}</strong>
              </div>

            </div>

            <div className="info-card">

              <h3>Account Settings</h3>

              <div className="row">
                <span>Profile</span>

                <button
                  className="link-button"
                  onClick={() => setDrawer("edit")}
                >
                  Edit Profile
                </button>
              </div>

              <div className="row">
                <span>Password</span>

                <button
                  className="link-button"
                  onClick={() => setDrawer("password")}
                >
                  Change Password
                </button>
              </div>

            </div>

          </div>

          <div className="profile-buttons">

            <button
              className="edit-btn"
              onClick={() => setDrawer("edit")}
            >
              ✏️ Edit Profile
            </button>

            <button
              className="password-btn"
              onClick={() => setDrawer("password")}
            >
              🔒 Change Password
            </button>

          </div>

        </div>
      )}

      {/* Overlay */}

      <div
        className={`drawer-overlay ${drawer ? "show" : ""}`}
        onClick={() => setDrawer(null)}
      ></div>

      {/* Drawer */}

      <div className={`drawer ${drawer ? "open" : ""}`}>

        <button
          className="close-drawer"
          onClick={() => setDrawer(null)}
        >
          ✕
        </button>

        {drawer === "edit" && (
          <EditProfileDrawer
            profile={profile}
            closeDrawer={() => setDrawer(null)}
          />
        )}

        {drawer === "password" && (
          <ChangePasswordDrawer
            closeDrawer={() => setDrawer(null)}
          />
        )}

      </div>

    </div>
  );
}