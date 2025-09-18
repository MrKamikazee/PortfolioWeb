import React from 'react';
//import '../../CSS/Others/ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title section-title">{project.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img 
              src={project.image} 
              alt={project.title}
              className="modal-image"
            />
          </div>
          
          <div className="modal-info">
            <div className="modal-description">
              <h3>Descripción</h3>
              <p>{project.description}</p>
            </div>
            
            <div className="modal-technologies">
              <h3>Tecnologías</h3>
              <div className="skills-badges">
                {project.technologies?.codes?.map((code, index) => (
                    <span key={index} className="skill-badge codes">{code}</span>
                ))}

                {project.technologies?.apps?.map((app, index) => (
                    <span key={index} className="skill-badge apps">{app}</span>
                ))}

                {project.technologies?.tools?.map((tool, index) => (
                    <span key={index} className="skill-badge tools">{tool}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-features">
              <h3>Características</h3>
              <ul>
                {project.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          {project.githubUrl && (
              <a href={project.githubUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="modal-button"
              >
                GitHub
              </a>
          )}
          {project.itchIo && (
              <a href={project.itchIo}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="modal-button"
              >
                Itch.Io
              </a>
          )}
          {project.webUrl && (
              <a href={project.webUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="modal-button"
              >
                Web
              </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;