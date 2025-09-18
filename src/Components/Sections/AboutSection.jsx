import React, {useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../CSS/Sections/About.css';

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const entryTriggerRef = useRef(null);
    const [projectsCount, setCount] = useState(null);

    useEffect(() => {
        const entryTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse"
            }
        });

        entryTl.fromTo(imageRef.current, 
            { opacity: 0, x: -50, scale: 0.8 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo(contentRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        );

        entryTriggerRef.current = entryTl.scrollTrigger;

        const exitTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "bottom 60%",
                end: "bottom 10%",
                scrub: true,
            }
        });

        return () => {
            if (entryTriggerRef.current) entryTriggerRef.current.kill();
        };
    }, []);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/Projects/Projects.json`, { cache: 'no-store'})
            .then(r => r.json())
            .then(data => setCount(Array.isArray(data) ? data.length : 0))
            .catch(() => setCount(0));
    }, []);

    const scrollToProjects = () => {
        const projectsSection = document.querySelector('.projects-section');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="about-section" ref={sectionRef}>
            <div className="about container">
                <header className="about__header">
                    <h2 className="about__title">Sobre Mi</h2>
                </header>

                <div className="about__grid">
                    <figure className="about__media" ref={imageRef}>
                        <div className="about__photo">
                            <img src="/Images/MiFoto.jpg" alt="Foto de Martín" />
                        </div>
                    </figure>

                    <div className="about__content" ref={contentRef}>
                        <p className="about__intro">
                            ¡Hola! Soy <span className="highlight">Martín Román</span>, desarrollador y diseñador de <span className="highlight">videojuegos</span> enfocado en experiencias educativas y de entretenimiento.
                        </p>
                        <p>
                            Transformo ideas complejas en aplicaciones elegantes y funcionales. Con <span className="highlight">5 años</span> en C# para Unity y <span className="highlight">3 años</span> con blueprints en Unreal, priorizo código limpio y eficiente.
                        </p>

                        <div className="about__stats">
                            <div className="stat">
                                <span className="stat__num">{projectsCount}+</span>
                                <span className="stat__label">Proyectos</span>
                            </div>
                            <div className="stat">
                                <span className="stat__num">5</span>
                                <span className="stat__label">Años exp.</span>
                            </div>
                        </div>

                        <div className="about__skills">
                            <h3 className="about__subtitle">Conocimientos Principales</h3>
                            <div className="skills">
                                <span className="skill is-code">C#</span>
                                <span className="skill is-code">C++</span>
                                <span className="skill is-code">Blueprints</span>
                                <span className="skill is-app">Unity</span>
                                <span className="skill is-app">Unreal</span>
                                <span className="skill is-app">Blender</span>
                                <span className="skill is-tool">Git</span>
                                <span className="skill is-tool">Photon</span>
                                <span className="skill is-tool">SpacetimeDB</span>
                            </div>
                        </div>

                        <div className="about__actions">
                            <a
                                className="button button--secondary"
                                href="https://drive.proton.me/urls/5J7NAMNBBR#l2IJOZU7HEHH"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Descargar CV
                            </a>
                            <a className="button" onClick={scrollToProjects}>Ver Proyectos</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;