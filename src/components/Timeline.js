import React from 'react';
import './Timeline.css';


function Timeline({ data }) {
  return (
    <section id="education" className="timeline-section">
      <h2>Education & Experience</h2>
      <div className="timeline-container">
        {data.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className={`timeline-dot ${item.type}`}></div>
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
