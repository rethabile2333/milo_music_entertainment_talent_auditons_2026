import { useState } from "react";
import api from "../services/api";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "Artist", // Must match the option value exactly
    genre: "",
    instrument_type: "",
    dance_style: "",
    model_type: "",
    judge_category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">

        <div className="logo-section">
          <img src="/logo.jpeg" alt="Milo Logo" className="register-logo" />
          <h2 className="register-title">
            Register for Milo Music Entertainment
            <br />
            Talent Auditions 2026
          </h2>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                  genre: "",
                  model_type: "",
                  instrument_type: "",
                  dance_style: "",
                  judge_category: "",
                })
              }
            >
              <option value="Artist">Artist</option>
              <option value="Model">Model</option>
              <option value="Instrumentalist">Instrumentalist</option>
              <option value="Traditional Dancer">Traditional Dancer</option>
              <option value="Admin">Admin</option>
              <option value="Judge">Judge</option>
            </select>
          </div>

          {/* Artist */}
          {form.role === "Artist" && (
            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                placeholder="Enter your genre"
                value={form.genre}
                onChange={(e) =>
                  setForm({ ...form, genre: e.target.value })
                }
              />
            </div>
          )}

          {/* Model */}
          {form.role === "Model" && (
            <div className="form-group">
              <label>Model Type</label>
              <input
                type="text"
                placeholder="Fashion, Commercial, Runway..."
                value={form.model_type}
                onChange={(e) =>
                  setForm({ ...form, model_type: e.target.value })
                }
              />
            </div>
          )}

          {/* Instrumentalist */}
          {form.role === "Instrumentalist" && (
            <div className="form-group">
              <label>Instrument Type</label>
              <input
                type="text"
                placeholder="Enter your instrument"
                value={form.instrument_type}
                onChange={(e) =>
                  setForm({ ...form, instrument_type: e.target.value })
                }
              />
            </div>
          )}

          {/* Traditional Dancer */}
          {form.role === "Traditional Dancer" && (
            <div className="form-group">
              <label>Dance Style</label>
              <input
                type="text"
                placeholder="Enter your dance style"
                value={form.dance_style}
                onChange={(e) =>
                  setForm({ ...form, dance_style: e.target.value })
                }
              />
            </div>
          )}

          {/* Judge */}
          {form.role === "Judge" && (
            <div className="form-group">
              <label>Judge Category</label>
              <select
                value={form.judge_category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    judge_category: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                <option value="Artist">Artist</option>
                <option value="Model">Model</option>
                <option value="Instrumentalist">Instrumentalist</option>
                <option value="Traditional Dancer">
                  Traditional Dancer
                </option>
              </select>
            </div>
          )}

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}