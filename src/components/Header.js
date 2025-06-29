import React, { useEffect, useState } from 'react';
import './Header.css';
import avatar from '../assets/photo.jpeg'; 

const Header = () => {
  const fullText = 'محمد صلاح\nمطور تطبيقات ومواقع ويب\nأصنع حلول رقمية بذكاء وبساطة.';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      } else {
        clearInterval(interval);
      }
    }, 60); 

    return () => clearInterval(interval);
  }, [index]);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="typewriter">{displayedText}</h1>
      </div>
      <div className="header-right">
        <img src={avatar} alt="avatar" className="avatar" />
      </div>
    </header>
  );
};

export default Header;
