import { useState } from "react";
import api from "../services/api";
import "./Register.css"; // import the CSS file

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "artist",
    genre: "",
    instrument: "",
    dance_style: "",
    height: "" ,// add height so it's tracked properly
 judge_category: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered successfully!");
  };

  return (
    <div className="register-page">
      <div className="register-box">
        {/* Logo + Title */}
        <div className="logo-section">
          <img src="/logo.jpeg" alt="Milo Logo" className="register-logo" />
          <h2 className="register-title">Register for Milo Music Entertainment <br /> Talent Auditions 2026</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              placeholder="Enter your full name"
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              value={form.role}
            >
              <option value="Artist">Artist</option>
              <option value="Model">Model</option>
              <option value="Instrumentalist">Instrumentalist</option>
              <option value="Traditional Dancer">Traditional Dancer</option>
              <option value="Admin">Admin</option>
              <option value="Judge">Judge</option>
            </select>
          </div>

          {/* Conditional fields */}
          {form.role === "Artist" && (
            <div className="form-group">
              <label>Genre</label>
              <input
                placeholder="Enter your genre"
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
              />
            </div>
          )}
          {form.role === "Model" && (
            <div className="form-group">
              <label>Height</label>
              <input
                placeholder="Height (e.g., 175cm)"
                onChange={(e) => setForm({ ...form, height: e.target.value })}
              />
            </div>
          )}
          {form.role === "Instrumentalist" && (
            <div className="form-group">
              <label>Instrument Type</label>
              <input
                placeholder="Enter your instrument"
                onChange={(e) => setForm({ ...form, instrument: e.target.value })}
              />
            </div>
          )}
          {form.role === "Traditional Dancer" && (
            <div className="form-group">
              <label>Dance Style</label>
              <input
                placeholder="Enter your dance style"
                onChange={(e) => setForm({ ...form, dance_style: e.target.value })}
              />
            </div>
          )}
          
          {form.role === "Judge" && (
  <div className="form-group">
    <label>Judge Category</label>
    <select
      value={form.judge_category}
      onChange={(e) =>
        setForm({ ...form, judge_category: e.target.value })
      }
    >
      <option value="">Select Category</option>
      <option value="Artist">Artist</option>
      <option value="Model">Model</option>
      <option value="Instrumentalist">Instrumentalist</option>
      <option value="Traditional Dancer">Traditional Dancer</option>
    </select>
  </div>
)}
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}
