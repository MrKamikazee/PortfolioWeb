import React, {useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../CSS/NavBar.css';

gsap.registerPlugin(ScrollTrigger);

function NavBar() {
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const buttonsRef = useRef(null);
    const hamburgerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const scrollTriggerRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    useEffect(() => {
        const navbar = navbarRef.current;
        const logo = logoRef.current;
        const buttons = buttonsRef.current;
        const hamburger = hamburgerRef.current;

        gsap.set(navbar, {
            backgroundColor: "transparent",
            backdropFilter: "none",
            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)"
        });
        gsap.set([logo, buttons, hamburger], {
            opacity: 0,
            y: -20
        });

        const showNavbar = gsap.timeline({ paused: true });
        showNavbar
            .to(navbar, {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
                duration: 0.2,
                ease: "power2.out"
            }, 0)
            .to([logo, buttons, hamburger], {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, 0.1);

        const hideNavbar = gsap.timeline({ paused: true });
        hideNavbar
            .to([logo, buttons, hamburger], {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "back.in"
            }, 0)
            .to(navbar, {
                backgroundColor: "transparent",
                backdropFilter: "none",
                boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
                duration: 0.4,
                ease: "power2.in"
            }, 0.3);

        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: ".hero-section",
            start: "bottom top",
            end: "bottom top",
            onEnter: () => {
                setIsNavbarVisible(true);
                showNavbar.play();
            },
            onLeaveBack: () => {
                setIsNavbarVisible(false);
                hideNavbar.play();
            }
        });

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
        };
    }, [isNavbarVisible]);

    const toggleMobileMenu = () => {
        if (!isNavbarVisible)
            return;
        
        const mobileMenu = mobileMenuRef.current;

        if (!isMobileMenuOpen) {
            setIsMobileMenuOpen(true);
            gsap.set(mobileMenu, { display: 'flex' });
            gsap.fromTo(mobileMenu,
                {
                    opacity: 0,
                    y: -20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );
        } else {
            gsap.to(mobileMenu, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(mobileMenu, { display: 'none' });
                    setIsMobileMenuOpen(false);
                }
            });
        }
    };

    const scrollToSection = (sectionClass) => {
        if (!isNavbarVisible)
            return;
        
        const section = document.querySelector(`.${sectionClass}`);
        if (section) {
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: section,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });
        }
    };

    return (
        <nav className="navbar" ref={navbarRef}>
            <div className="navbar-container">
                <div className="navbar-logo" ref={logoRef}>
                    <span>Mi Portfolio</span>
                </div>
                <div className="navbar-buttons" ref={buttonsRef}>
                    <button 
                        className="navbar-button"
                        onClick={() => scrollToSection('about-section')}
                        disabled={!isNavbarVisible}
                        style={{ 
                            pointerEvents: isNavbarVisible ? 'auto' : 'none',
                            cursor: isNavbarVisible ? 'pointer' : 'default'
                        }}
                    >
                        Sobre Mi
                    </button>
                    <button 
                        className="navbar-button"
                        onClick={() => scrollToSection('projects-section')}
                        disabled={!isNavbarVisible}
                        style={{ 
                            pointerEvents: isNavbarVisible ? 'auto' : 'none',
                            cursor: isNavbarVisible ? 'pointer' : 'default'
                        }}
                    >
                        Proyectos
                    </button>
                </div>
                <button
                    className="hamburger-button"
                    ref={hamburgerRef}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    disabled={!isNavbarVisible}
                    style={{ 
                        pointerEvents: isNavbarVisible ? 'auto' : 'none',
                        cursor: isNavbarVisible ? 'pointer' : 'default'
                    }}
                >
                    <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                </button>
            </div>
            <div className="mobile-menu" ref={mobileMenuRef}>
                <button
                    className="mobile-menu-button"
                    onClick={() => scrollToSection('about-section')}
                    disabled={!isMobileMenuOpen}
                    style={{ 
                        pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                        cursor: isMobileMenuOpen ? 'pointer' : 'default'
                    }}
                >
                    Sobre Mi
                </button>
                <button
                    className="mobile-menu-button"
                    onClick={() => scrollToSection('projects-section')}
                    disabled={!isMobileMenuOpen}
                    style={{ 
                        pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                        cursor: isMobileMenuOpen ? 'pointer' : 'default'
                    }}
                >
                    Proyectos
                </button>
            </div>
        </nav>
    );
}

export default NavBar;