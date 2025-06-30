import React, { useEffect, useState, useRef } from 'react';
import './Skills.css';

const skills = [
  { name: 'HTML & CSS', level: 90 },
  { name: 'JavaScript', level: 80 },
  { name: 'ReactJS', level: 85 },
  { name: 'Flutter', level: 99 },
];

const Skills = () => {
  const sectionRef = useRef();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const current = sectionRef.current;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setAnimate(true),
      { threshold: 0.3 }
    );
    current && obs.observe(current);
    return () => current && obs.unobserve(current);
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      <div className="skills-left">
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-bar">
            <div className="label">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>

            <div className="bar-bg" data-tooltip={`${skill.level}%`}>
              <div
                className="bar-fill"
                style={{ width: animate ? `${skill.level}%` : 0 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="skills-right">
        <h2>My Skills</h2>
        <p>
          لدي خبرة قوية في بناء الواجهات المتجاوبة باستخدام ReactJS، CSS Grid وFlexbox،
          بالإضافة إلى كتابة كود نظيف ومحسن.<br />
          أيضًا لدي خبرة في بناء تطبيقات Android وiOS باستخدام Flutter.
        </p>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mhmdsalah2022@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Skills;
