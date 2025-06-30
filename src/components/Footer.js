import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [showBtn, setShowBtn] = useState(false);
  const ringRef = useRef(null);
  const C = 2 * Math.PI * 14; 

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h ? y / h : 0;                
      setShowBtn(y > 300);

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = C - C * pct;
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();                                  
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <p>&copy; {year} Mohammed Salah Nahed Salah. All rights reserved.</p>

      <ul className="quick-links">
        {links.map((l) => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>

      <div className="social-icons">
        <a href="https://github.com/mhmdsalah22" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/mohammedsalah6b4699272/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        <a href="https://x.com/mohammed_8522?s=21" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
      </div>

      {showBtn && (
        <button className="scroll-top-btn" onClick={toTop}>
          <svg className="ring" width="32" height="32">
            <circle className="ring-bg" r="14" cx="16" cy="16" strokeWidth="4" fill="none" />
            <circle className="ring-bar" r="14" cx="16" cy="16" strokeWidth="4" fill="none" ref={ringRef} />
          </svg>

          <span className="arrow">↑</span>
        </button>
      )}
    </footer>
  );
};

export default Footer;
