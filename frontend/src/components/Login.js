import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

     console.log("Login Response:", JSON.stringify(res.data, null, 2));
      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Optional: save user details
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Saved Token:", localStorage.getItem("token"));

      if (res.data.user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "Judge") {
        navigate("/judge/dashboard");
      } else {
        navigate("/dashboard/user");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="logo-section">
          <img src="/logo.jpeg" alt="Milo Logo" className="login-logo" />
          <h2>
            Login to Milo Music Entertainment
            <br />
            Talent Auditions 2026
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
