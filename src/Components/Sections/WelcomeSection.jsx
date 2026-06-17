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
            <video
              className="welcome__video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={`${process.env.PUBLIC_URL}/Images/Background 1.mp4`}
            />
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