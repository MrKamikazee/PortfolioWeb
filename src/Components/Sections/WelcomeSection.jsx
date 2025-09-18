import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WelcomeSection = () => {
    const logoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            logoRef.current,
            { opacity: 0, yPercent: -60 },
            { opacity: 1, yPercent: 0, duration: 3, ease: 'power4.out' }
        );
    }, []);

    return (
      <section className="welcome" ref={sectionRef}>
          <div className="welcome__bg" aria-hidden="true">
            {false && (
              <video
                className="welcome__video"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                // src="/ruta/a/tu-video.mp4"
                // poster="/ruta/a/tu-poster.jpg"
              />
            )}
          </div>
          <div className="welcome__content">
              <h1 className="welcome__title" ref={logoRef}>
                  Mi Portafolio
              </h1>
          </div>
      </section>
    );
};

export default WelcomeSection;