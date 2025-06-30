
import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  const [activeSection, setActiveSection] = useState('');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScroll = useRef(0); 
    useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent((y / h) * 100);
  
      document.querySelectorAll('section').forEach((sec) => {
        const top = sec.offsetTop - 100;
        const bottom = top + sec.offsetHeight;
        if (y >= top && y < bottom) setActiveSection(sec.id || '');
      });
  
      if (y > lastScroll.current && y > 100) setShowNavbar(false);
      else setShowNavbar(true);
  
      lastScroll.current = y;     
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <>
      <div className="scroll-circle">
        <svg className="progress-ring" width="60" height="60">
          <circle
            className="progress-ring__circle"
            stroke="#f39c12"
            strokeWidth="6"
            fill="transparent"
            r="26"
            cx="30"
            cy="30"
            style={{
              strokeDasharray: 2 * Math.PI * 26,
              strokeDashoffset: 2 * Math.PI * 26 * (1 - scrollPercent / 100),
              transition: 'stroke-dashoffset 0.3s ease'
            }}
          />
        </svg>
        <span className="scroll-percent">{Math.round(scrollPercent)}%</span>
      </div>
      <nav className={`navbar ${showNavbar ? 'show' : 'hide'} ${scrollPercent > 5 ? 'with-shadow' : ''}`}>

        <div className="logo">MyPortfolio</div>
        <ul className="nav-links">
          {['home', 'about', 'skills', 'education', 'projects', 'contact'].map((id) => (
            <li key={id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(id);
                }}
                className={activeSection === id ? 'active' : ''}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} className="theme-toggle">
              {darkMode ? '🌞' : '🌙'}
            </button>
          </li>
        </ul>

      </nav>
    </>
  );
};

export default Navbar;
