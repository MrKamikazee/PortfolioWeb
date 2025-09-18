import React, {useEffect, useState} from 'react';
import ProjectCard from '../Others/ProjectCard';
import ProjectModal from '../Others/ProjectModal';
import '../../CSS/Sections/ProjectSection.css';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState('idle');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const url = `${process.env.PUBLIC_URL}/Projects/Projects.json`;
        setStatus('loading');
        fetch(url, { cache: 'no-store' })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setProjects(Array.isArray(data) ? data : []);
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
        <section className="projects-section" aria-labelledby="projects-title">
            <div className="projects container">
                <header className="projects__header">
                    <h2 id="projects-title" className="projects__title">Mis Proyectos</h2>
                    <p className="projects__subtitle">Selección de trabajos y experimentos</p>
                </header>

                {status === 'loading' && <p className="projects__state">Cargando proyectos...</p>}
                {status === 'error' && <p className="projects__state state--error">No se pudieron cargar los proyectos.</p>}

                {status === 'ready' && (
                    <>
                        <div className="projects__grid">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id || project.title}
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
            </div>
        </section>
    );
};

export default ProjectsSection;