import React from 'react';
import './Projects.css';



function Projects({ data }) {
  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {data.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Projects;
