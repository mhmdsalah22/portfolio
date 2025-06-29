import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { projectsData } from './data/projectsData';
import { testimonialsData } from './data/testimonialsData';
import { timelineData } from './data/timelineData';

function App() {
  const refs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const scrollTo = (key) => {
    refs[key]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onNavigate={scrollTo} />
      <section id="home" ref={refs.home}><Header /></section>
      <section id="about" ref={refs.about}><About /></section>
      <section id="skills" ref={refs.skills}><Skills /></section>
      <section id="education" ref={refs.education}><Timeline data={timelineData} /></section>
      <section id="projects" ref={refs.projects}><Projects data={projectsData} /></section>
      <section id="testimonials"><Testimonials data={testimonialsData} /></section>
      <section id="contact" ref={refs.contact}><Contact /></section>
      <Footer />
    </>
  );
}

export default App;
