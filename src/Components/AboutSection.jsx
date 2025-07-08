import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../CSS/AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const entryTriggerRef = useRef(null);
    const exitTriggerRef = useRef(null);

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

        exitTl.to(sectionRef.current, {
            opacity: 0,
            y: -30,
            scale: 0.98,
            duration: 1,
            ease: "power2.out"
        });

        exitTriggerRef.current = exitTl.scrollTrigger;

        return () => {
            if (entryTriggerRef.current) {
                entryTriggerRef.current.kill();
            }
            if (exitTriggerRef.current) {
                exitTriggerRef.current.kill();
            }
        };
    }, []);

    const scrollToProjects = () => {
        const projectsSection = document.querySelector('.projects-section');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="about-section" ref={sectionRef}>
            <div className="about-container">
                <h2>Sobre Mi</h2>
                <div className="about-content" ref={contentRef}>
                    <div className="about-image" ref={imageRef}>
                        <div className="image-wrapper">
                            <img src="/path/to/your/photo.jpg" alt="Foto de Martín" />
                            <div className="image-gradient"></div>
                        </div>
                    </div>
                    <div className="about-text">
                        <p className="intro-text">
                            ¡Hola! Soy <span className="highlight">Martín Román</span>,
                            desarrollador y diseñador de <span className="highlight">videojuegos </span>
                            especializado en crear experiencias tanto educativas como para entretenimiento.
                        </p>
                        <p>
                            Transformo ideas complejas en aplicaciones elegantes y funcionales. 
                            Con <span className="highlight">5 años</span> trabajando en C# para Unity y
                            <span className="highlight"> 3 años</span> en blueprints para Unreal,
                            me enfoco en código limpio y eficiente para presentar soluciones de calidad tanto
                            para el backend como para el frontend.
                        </p>
                    </div>
                </div>

                <div className="highlight-stats">
                    <div className="stat-item">
                        <span className="stat-number">15+</span>
                        <span className="stat-label">Proyectos</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">5</span>
                        <span className="stat-label">Años exp.</span>
                    </div>
                </div>

                <div className="skills-section">
                    <h4>Conocimientos Principales</h4>
                    <div className="skills-badges">
                        <span className="skill-badge codes">C#</span>
                        <span className="skill-badge codes">C++</span>
                        <span className="skill-badge codes">Blueprints</span>
                        <span className="skill-badge apps">Unity</span>
                        <span className="skill-badge apps">Unreal</span>
                        <span className="skill-badge apps">Blender</span>
                        <span className="skill-badge tools">Git</span>
                        <span className="skill-badge tools">Photon</span>
                        <span className="skill-badge tools">SpacetimeDB</span>
                    </div>
                </div>

                <div className="cta-buttons">
                    <button className="cta">Descargar CV</button>
                    <button className="cta" onClick={scrollToProjects}>Ver Proyectos</button>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;