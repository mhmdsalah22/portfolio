import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import avatar from '../assets/photo.jpeg';
import resume from '../assets/resume.pdf';

const About = () => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const fullText = `أنا محمد صلاح ناهض صلاح العمصي، مطور ويب وتطبيقات، أمتلك شغفًا ببناء واجهات جذابة وسريعة باستخدام أحدث التقنيات. أركز على البساطة، السرعة، وتجربة المستخدم. لدي خبرة في تصميم وتطوير تطبيقات فعالة عبر Flutter و React. أؤمن أن التقنية وسيلة لتحسين حياة الناس، وأسعى باستمرار لتعلم وتطوير مهاراتي لمواكبة كل جديد. أطمح أن أكون جزءاً من فريق مبدع يسعى لصنع تأثير حقيقي.`;
  const shortText = fullText.slice(0, 120) + '...';

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
    return () => current && observer.unobserve(current);
  }, []);

  const handleResumeDownload = async () => {
    setIsDownloading(true);
    setDownloadError('');
    try {
      const res = await fetch(resume, { method: 'HEAD' });
      if (res.ok) {
        const link = document.createElement('a');
        link.href = resume;
        link.setAttribute('download', 'resume.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        throw new Error('Resume not found');
      }
    } catch (err) {
      setDownloadError('⚠️ الملف غير موجود حاليًا. حاول لاحقًا.');
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  return (
    <section id="about" ref={sectionRef} className={`about-section ${isVisible ? 'fade-in' : ''}`}>
      <div className="about-left">
        <img src={avatar} alt="About Avatar" />
      </div>
      <div className="about-right">
        <h2>About Me</h2>
        <p className="bio-text">
          {expanded ? fullText : shortText}
        </p>
        <button className="read-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Read Less' : 'Read More'}
        </button>
        <br />
        <button className="download-btn" onClick={handleResumeDownload}>
          {isDownloading ? 'Downloading...' : 'Download Resume'}
        </button>
        {downloadError && <p className="error-msg">{downloadError}</p>}
      </div>
    </section>
  );
};

export default About;
