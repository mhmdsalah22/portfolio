import React, { useState } from 'react';
import './Testimonials.css';

function Testimonials({ data }) {
  const [idx, setIdx] = useState(0);

  const next  = () => setIdx((i) => (i + 1) % data.length);
  const prev  = () =>
    setIdx((i) => (i === 0 ? data.length - 1 : i - 1));

  const renderStars = (n) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < n ? 'star filled' : 'star'}>★</span>
    ));

  const t = data[idx];

  return (
    <section id="testimonials" className="testimonials-section">
      <h2>My Customers</h2>

      <div className="carousel-wrapper">
        <button className="nav-btn prev" onClick={prev}>‹</button>

        <div className="testimonial-card">
          <img src={t.image} alt={t.name} />
          <h3>{t.name}</h3>
          <div className="stars">{renderStars(t.rating || 5)}</div>
          <p>{t.feedback}</p>
        </div>

        <button className="nav-btn next" onClick={next}>›</button>
      </div>
    </section>
  );
}

export default Testimonials;
