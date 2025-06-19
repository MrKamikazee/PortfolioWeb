import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './NavBar';
import AboutSection from './AboutSection';
import '../CSS/App.css';

gsap.registerPlugin(ScrollTrigger);

function Main() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const heroTriggerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0
            }
        });

        heroTriggerRef.current = tl.scrollTrigger;

        return () => {
            if (heroTriggerRef.current) {
                heroTriggerRef.current.kill();
            }
        };
    }, []);

    return (
        <div className="App">
            <NavBar />
            <div className="hero-section" ref={heroRef}>
                <div className="hero-background"></div>
                <div className="hero-content">
                    <h1 className="hero-logo">Mi Portafolio</h1>
                </div>
            </div>
            <div className="main-content" ref={contentRef}>
                <AboutSection />
                <section className="projects-section">
                    <h2>Proyectos</h2>
                    <p>Aquí van tus proyectos...</p>
                </section>
            </div>
        </div>
    );
}

export default Main;