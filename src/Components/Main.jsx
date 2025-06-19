import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './NavBar';
import '../CSS/App.css';

gsap.registerPlugin(ScrollTrigger);

function Main() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
                <section className="about-section">
                    <h2>Sobre Mi</h2>
                    <p>Aquí va tu información personal y profesional...</p>
                </section>
                
                <section className="projects-section">
                    <h2>Proyectos</h2>
                    <p>Aquí van tus proyectos...</p>
                </section>
            </div>
        </div>
    );
}

export default Main;