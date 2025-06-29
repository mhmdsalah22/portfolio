import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import avatar from '../assets/photo.jpeg';
import resume from '../assets/resume.pdf';

const About = () => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
  
    const current = sectionRef.current;
  
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };    
  }, []);
  

  return (
    <section id="about" ref={sectionRef} className={`about-section ${isVisible ? 'fade-in' : ''}`}>
      <div className="about-left">
        <img src={avatar} alt="About Avatar" />
      </div>
      <div className="about-right">
        <h2>About Me</h2>
        <p>
          أنا محمد صلاح ناهض صلاح العمصي، مطور ويب وتطبيقات، أمتلك شغفًا ببناء واجهات جذابة وسريعة باستخدام أحدث التقنيات.
          أركز على البساطة، السرعة، وتجربة المستخدم.
        </p>
        <a href={resume} download className="download-btn">Download Resume</a>
      </div>
    </section>
  );
};

export default About;
