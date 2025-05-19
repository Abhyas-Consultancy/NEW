// // src/components/Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';

// const Home = () => {
//   return (
//     <div className="home-container">
//       <header className="hero">
//         <h1>IELTSPro Coaching</h1>
//         <p>Your pathway to international success starts here.</p>
//         <div className="hero-buttons">
//           <Link to="/login" className="btn">Login</Link>
//           <Link to="/register" className="btn btn-outline">Register</Link>
//         </div>
//       </header>

//       <section className="info-section">
//         <h2>What is IELTS?</h2>
//         <p>
//           IELTS (International English Language Testing System) is the world’s most popular English language proficiency test for higher education and global migration.
//         </p>

//         <h3>Why Choose IELTSPro?</h3>
//         <ul>
//           <li>✅ AI-graded mock tests with instant feedback</li>
//           <li>✅ Experienced faculty & personalized training</li>
//           <li>✅ Free access to study material & video classes</li>
//           <li>✅ Practice speaking, writing, reading, and listening modules</li>
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default Home;

// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">IELTSPro</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="#about">About</Link></li>
          <li><Link to="#courses">Courses</Link></li>
          <li><Link to="#contact">Contact</Link></li>
          <li><Link to="/login" className="nav-button">Login</Link></li>
          <li><Link to="/register" className="nav-button">Register</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-left">
          <h1>Empowering your education</h1>
          <p>Unlock your potential with our diverse range of courses and supportive learning environment.</p>
          <button className="cta">Start journey now</button>
        </div>
        <div className="hero-right">
          <h2>STUDY ABROAD</h2>
          <p>IELTS Speaking, Listening, Reading, Writing</p>
        </div>
      </header>

      {/* Slider placeholder */}
      <section className="slider">[Slider Placeholder]</section>

      {/* IELTS Preparation */}
      <section id="about" className="section red-section">
        <h2>IELTS Preparation</h2>
        <p>Get well-structured training in all 4 IELTS sections with AI feedback and expert mentoring.</p>
      </section>

      {/* Our Courses */}
      <section id="courses" className="section">
        <h2>Our Courses</h2>
        <p>We offer online and offline options for IELTS training with support in Speaking, Reading, Writing and Listening.</p>

        <div className="course-grid">
          <div className="course red-bg">Speaking</div>
          <div className="course">Listening</div>
          <div className="course">Reading</div>
          <div className="course">Writing</div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats red-section">
        <div className="stat">100+<br />Active Students</div>
        <div className="stat">100+<br />Employed Students</div>
        <div className="stat">100+<br />Courses Taken</div>
        <div className="stat">100+<br />Years of Experience</div>
      </section>

      {/* Faculty Section */}
      <section className="section">
        <h2>Meet our faculty</h2>
        <div className="faculty-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="faculty-card">
              <div className="placeholder-img" />
              <h3>Mr. XYZ</h3>
              <p>Experienced IELTS Trainer with 10+ years in the field.</p>
            </div>
          ))}
        </div>
      </section>

      {/* World Map */}
      <section className="section">
        <h2>Our Global Presence</h2>
        <div className="map-placeholder">[Map Image Here]</div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="contact-form red-section">
        <h2>Send us a message</h2>
        <form>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <p>&copy; IELTSPro.com 2025</p>
          <div className="footer-links">
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="#courses">Courses</a>
            <a href="mailto:info@ieltspro.com">info@ieltspro.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
