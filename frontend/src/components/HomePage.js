import "./HomePage.css";
import { useNavigate } from "react-router-dom";  // 👈 add this

export default function HomePage() {
  const navigate = useNavigate();  // 👈 initialize navigate
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo-area">
          <img src="/logo.jpeg" alt="Milo Logo" className="logo" />
          <h1 className="site-title">Talent Auditions</h1>
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/login">Sign In</a>
          <a href="/register">Sign Up</a>
        </nav>
      </header>

      {/* Welcome message above the picture */}
      <div className="welcome-text">
        <h2>Welcome to Milo Music Entertainment Talent Auditions 2026</h2>
      </div>

      {/* Banner with background image */}
      <section className="banner">
        <img src="/bgg.jpeg" alt="Background" className="banner-img" />
        <div className="banner-overlay">
          <p>Showcase your talent and join the journey.</p>
           <button className="cta-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </section>
    </div>
  );
}


