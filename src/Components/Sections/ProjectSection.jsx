import React, {useEffect, useState} from 'react';
import ProjectCard from '../Others/ProjectCard';
import ProjectModal from '../Others/ProjectModal';
import '../../CSS/Sections/Projects.css';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState('idle');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const url = `${process.env.PUBLIC_URL}/Data/Projects.json`;
        setStatus('loading');
        fetch(url, {cache: 'no-store'})
            .then((res) => {
                if (res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setProjects(data);
                setStatus('ready');
            })
            .catch(() => setStatus('error'));
    }, []);

    const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

    const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

    return (
        <section className="projects-section section-container">
      <h2 className="section-title">Mis Proyectos</h2>
        {status === 'loading' && <p>Cargando proyectos...</p>}
        {status === 'error' && <p>No se pudieron cargar los proyectos</p>}
        {status === 'ready' && (
            <>
                <div className="projects-grid">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={handleProjectClick}
                        />
                    ))}
                </div>

                <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </>
        )}
    </section>
    );
};

export default ProjectsSection;