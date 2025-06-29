import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / winHeight) * 100;
      setScrollPercent(scrolled);

      const sections = document.querySelectorAll('section');
      sections.forEach((sec) => {
        const top = sec.offsetTop - 100;
        const bottom = top + sec.offsetHeight;
        if (scrollTop >= top && scrollTop < bottom) {
          setActiveSection(sec.id || ''); // fallback in case no ID
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollPercent}%` }}></div>
      <nav className="navbar">
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
