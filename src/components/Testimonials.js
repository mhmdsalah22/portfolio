import React from 'react';
import './Testimonials.css';



function Testimonials({ data }) {
  return (
    <section id="testimonials" className="testimonials-section">
      <h2>My Customers</h2>
      <div className="testimonials-container">
        {data.map((cust, index) => (
          <div className="testimonial-card" key={index}>
            <img src={cust.image} alt={cust.name} />
            <h3>{cust.name}</h3>
            <p>{cust.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
