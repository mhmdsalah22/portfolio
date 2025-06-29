import React, { useEffect, useRef } from 'react';
import './Timeline.css';

function Timeline({ data }) {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="timeline-section">
      <h2>Education &amp; Experience</h2>
      <div className="timeline-container">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="timeline-item"
            ref={(el) => (itemsRef.current[idx] = el)}
          >
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
