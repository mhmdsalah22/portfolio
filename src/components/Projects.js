import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects({ data }) {
  /* ────────── حالة المودال ────────── */
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [slide, setSlide] = useState(0);

  const openProject = (proj) => {
    setSelected(proj);
    setSlide(0);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const next = () =>
    setSlide((s) => (s + 1) % (selected.images?.length || 1));
  const prev = () =>
    setSlide((s) =>
      s === 0 ? (selected.images?.length || 1) - 1 : s - 1
    );

  /* إغلاق بالـ Esc */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="projects-section">
      <h2>Projects</h2>

      {/* شبكة الكروت */}
      <div className="projects-grid">
        {data.map((p, i) => (
          <div key={i} className="project-card" onClick={() => openProject(p)}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>

      {/* ────────── المودال ────────── */}
      {open && selected && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>✕</button>

            {/* Carousel */}
            <div className="carousel">
              <button className="nav prev" onClick={prev}>‹</button>
              <img
                src={
                  (selected.images
                    ? selected.images[slide]
                    : selected.image)
                }
                alt={selected.title}
              />
              <button className="nav next" onClick={next}>›</button>
            </div>

            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Visit&nbsp;Project ↗
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
