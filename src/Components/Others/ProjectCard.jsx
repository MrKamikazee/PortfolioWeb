import React from 'react';
import '../../CSS/Others/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <article
      className="pcard"
      role="button"
      tabIndex={0}
      aria-label={`Abrir ${project?.title}`}
      onClick={() => onClick(project)}
      onKeyDown={handleKey}
    >
      <div className="pcard__bg" aria-hidden="true">
        <img
          src={`${process.env.PUBLIC_URL}/Projects/${project.title}/${project.image}`}
          alt=""
          className="pcard__img"
          loading="lazy"
        />
        <div className="pcard__shade"></div>
      </div>
      <div className="pcard__content">
        <h3 className="pcard__title">{project.title}</h3>
      </div>
    </article>
  );
};

export default ProjectCard;