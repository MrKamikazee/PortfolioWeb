import React from 'react';
import '../../CSS/Others/ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project);
    }
  };

  // Extraer las tecnologías principales para mostrar como etiquetas (máx 3)
  const primaryTech = [
    ...(project.technologies?.codes || []),
    ...(project.technologies?.apps || [])
  ].slice(0, 3);

  return (
    <article
      className="pcard"
      role="button"
      tabIndex={0}
      aria-label={`Abrir ${project?.title}`}
      onClick={() => onClick(project)}
      onKeyDown={handleKey}
    >
      <div className="pcard__img-container" aria-hidden="true">
        <img
          src={`${process.env.PUBLIC_URL}/Projects/${project.title}/${project.presentationImage}`}
          alt=""
          className="pcard__img"
          loading="lazy"
        />
      </div>
      <div className="pcard__content">
        {primaryTech.length > 0 && (
          <div className="pcard__tags">
            {primaryTech.map((tech) => (
              <span key={tech} className="pcard__tag">
                {tech}
              </span>
            ))}
          </div>
        )}
        <h3 className="pcard__title">{project.title}</h3>
      </div>
    </article>
  );
};

export default ProjectCard;