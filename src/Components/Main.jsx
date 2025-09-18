import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './Sections/NavBar';
import WelcomeSection from './Sections/WelcomeSection';
import AboutSection from './Sections/AboutSection';
import ProjectSection from "./Sections/ProjectSection";
import '../CSS/App.css';
import '../CSS/Sections/WelcomeSection.css';

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
            <WelcomeSection />
            <div className="main-content" ref={contentRef}>
                <AboutSection />
                <ProjectSection />
            </div>
        </div>
    );
}

export default Main;