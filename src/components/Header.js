import React, { useEffect, useState } from 'react';
import './Header.css';
import avatar from '../assets/photo.jpeg';

const Header = () => {
  const titles = [
    'محمد صلاح',
    'مطور تطبيقات',
    'مطور مواقع ويب',
    'أصنع حلول رقمية بذكاء وبساطة'
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopped, setIsPopped] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let speed = isDeleting ? 40 : 100;

    const timeout = setTimeout(() => {
      setDisplayedText(current.slice(0, charIndex));
      if (!isDeleting) {
        if (charIndex < current.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex, titles]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.documentElement.style.setProperty('--tiltX', `${x}deg`);
      document.documentElement.style.setProperty('--tiltY', `${-y}deg`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleAvatarClick = () => {
    setIsPopped(true);
    setTimeout(() => setIsPopped(false), 300);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="typewriter">{displayedText}</h1>
      </div>
      <div className="header-right">
        <img
          src={avatar}
          alt="avatar"
          className={`avatar ${isPopped ? 'popped' : ''}`}
          onClick={handleAvatarClick}
        />
      </div>
    </header>
  );
};

export default Header;
