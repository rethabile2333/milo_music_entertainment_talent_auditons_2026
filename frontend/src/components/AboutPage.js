import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="header">
        <div className="logo-area">
          <img src="/logo.jpeg" alt="Milo Logo" className="logo" />
          <h1 className="site-title">Talent Auditions 2026</h1>
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/login">Sign In</a>
          <a href="/register">Sign Up</a>
        </nav>
      </header>

      <section className="about-content">
        <h2>About Milo Music Entertainment Talent Auditions</h2>
        <p>
          Milo Music Entertainment is proud to present <strong>Talent Auditions 2026</strong>,
          a platform dedicated to discovering and nurturing fresh talent across Lesotho and beyond.
        </p>

        <h3>Event Details</h3>
        <ul>
          <li><strong>Date:</strong> 8th August 2026</li>
          <li><strong>Venue:</strong> Global Guesthouse, Naleli, Maseru 100, Lesotho</li>
          <li><strong>Time:</strong> 11:00 AM – 2:00 PM</li>
        </ul>

        <h3>Why Audition?</h3>
        <p>
          Participants will have the chance to perform at major Milo Music events,
          gain professional recording and promotion opportunities, and work with
          top producers and choreographers. This is your opportunity to showcase
          your talent and take the first step toward stardom.
        </p>

        <h3>Who We’re Looking For</h3>
        <ul>
          <li>Traditional Dancers – all cultural styles welcome</li>
          <li>Artists – singers, rappers, vocalists</li>
          <li>Models – runway, commercial, promo</li>
          <li>Instrumentalists – accordion, guitars, drums, keys, traditional instruments</li>
        </ul>

        <h3>Registration</h3>
        <p>
          To register, send a WhatsApp message to <strong>+266 5388 2100</strong> or <strong>+266 6262 0909</strong> 
          with the subject <em>“MILO AUDITION”</em>. Walk-ins are welcome, but registration is preferred.
          If you’re under 18, please bring a parent or guardian.
        </p>
      </section>
    </div>
  );
}
