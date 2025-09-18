import React from 'react';
//import '../../CSS/Others/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="project-card-background">
        <img 
          src={project.image} 
          alt={project.title}
          className="project-image"
        />
        <div className="project-overlay"></div>
      </div>
      <div className="project-card-content">
        <h3 className="project-title">{project.title}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;