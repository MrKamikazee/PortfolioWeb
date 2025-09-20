import React, {useMemo, useState, useEffect, useRef} from 'react';
import '../../CSS/Others/ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [project?.id, isOpen]);

  const images = useMemo(() => {
    return  Array.isArray(project?.images) && project?.images?.length > 0
        ? project.images
        : (project?.presentationImage ? [project.presentationImage] : []);
  }, [project]);
  const resolveImageSrc = (fileName) => {
      return `${process.env.PUBLIC_URL}/Projects/${project.title}/Images/${fileName}`;
  };
  const hasMultiple = images.length > 1;
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" ref={dialogRef}>
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{project.title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar" ref={closeBtnRef}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-image-container">
            {hasMultiple && (
              <button
                  className="carousel-btn prev"
                  onClick={goPrev}
                  aria-label="Anterior"
              >
                  ‹
              </button>
            )}
            <div className="modal-image">
              <img src={resolveImageSrc(images[index])}
                   alt={`${project.title} - ${index + 1}/${images.length}`}
              />
            </div>
            {hasMultiple && (
                <button
                  className="carousel-btn next"
                  onClick={goNext}
                  aria-label="Siguiente"
                >
                  ›
                </button>
            )}
            {hasMultiple && (
                <div className="carousel-dots" aria-label="Selector de imagen">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === index ? 'is-active' : ''}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Ir a imagen ${i + 1}`}
                        />
                    ))}
                </div>
            )}
          </div>
          <div className="modal-info">
            <section className="modal-section">
              <h3>Descripción</h3>
              <p>{project.description}</p>
            </section>

            <section className="modal-section">
              <h3>Tecnologías</h3>
              <div className="skills">
                {project.technologies?.codes?.map((t, i) => (<span key={`c-${i}`} className="skill is-code">{t}</span>))}
                {project.technologies?.apps?.map((t, i) => (<span key={`a-${i}`} className="skill is-app">{t}</span>))}
                {project.technologies?.tools?.map((t, i) => (<span key={`t-${i}`} className="skill is-tool">{t}</span>))}
              </div>
            </section>

            {project.features?.length ? (
              <section className="modal-section">
                <h3>Características</h3>
                <ul className="features">
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        <div className="modal-footer">
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button modal-button">GitHub</a>}
          {project.itchIo && <a href={project.itchIo} target="_blank" rel="noopener noreferrer" className="button modal-button">Itch.Io</a>}
          {project.GDD && <a href={project.GDD} target="_blank" rel="noopener noreferrer" className="button modal-button">GDD</a>}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;